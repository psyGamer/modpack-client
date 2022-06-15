extern crate reqwest;

#[trauri::command]
pub fn download_file(file_url: &str) {
	//let body = reqwest::get("https://www.rust-lang.org")
	let body = reqwest::get(file_url)
		.await?
		.text()
		.await?;

	println!("body = {:?}", body);
}