
#[tauri::command]
async fn download_file() {
	//let body = reqwest::get("https://www.rust-lang.org")
	println!("From JS")
}

fn main() {
  tauri::Builder::default()
	.invoke_handler(tauri::generate_handler![download_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}