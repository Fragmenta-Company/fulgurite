use std::env;

use serde_json::json;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePool};
use tauri::{AppHandle, Manager};

const FULGURITE_VERSION: &str = env!("CARGO_PKG_VERSION");

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Serialize, Debug)]
struct Repository {
    id: String,
    name: String,
    path: String,
}

#[tauri::command]
fn get_fulgurite_version() -> &'static str {
    FULGURITE_VERSION
}

#[tauri::command]
async fn list_known_repositories() -> Result<serde_json::Value, String> {
    let sqlite_test_path = match env::var("SQLITE_PATH") {
        Ok(path) => path,
        Err(e) => return Err(e.to_string()),
    };

    let options = SqliteConnectOptions::new()
        .filename(sqlite_test_path)
        .create_if_missing(true);

    let pool = match SqlitePool::connect_with(options).await {
        Ok(pool) => pool,
        Err(e) => return Err(e.to_string()),
    };

    let _ = sqlx::query_as::<sqlx::Sqlite, ()>(
        "CREATE TABLE knownrepos (
        id TEXT,
        name TEXT,
        path TEXT)",
    )
    .fetch(&pool);

    let repositories = sqlx::query_as!(Repository, "SELECT * FROM knownrepos")
        .fetch_all(&pool)
        .await;

    println!("{:?}", repositories);

    match repositories {
        Err(e) => Err(e.to_string()),
        Ok(repos) => {
            println!("{:?}", json!(repos));
            Ok(json!(repos))
        }
    }
}

#[tauri::command]
async fn open_window(app: AppHandle, label: String) -> Result<(), String> {
    let window = match app.get_webview_window(&label) {
        None => return Err("Window not found".to_string()),
        Some(window) => window,
    };

    if let Err(e) = window.show() {
        return Err(e.to_string());
    }

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            open_window,
            list_known_repositories,
            get_fulgurite_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
