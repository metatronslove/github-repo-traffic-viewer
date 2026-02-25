# GitHub Repository Traffic Viewer

🚀 A handy tool to view your own GitHub repository traffic statistics

![Imagination](https://github.com/metatronslove/github-repo-traffic-viewer/blob/main/docs/forklay%C4%B1n-diyorum-y%C3%BCkledi%C4%9Fimden-beri-bin-klon-s%C4%B1f%C4%B1r-fork.png?raw=true)

## Features

- Traffic statistics for all your repositories (views/clones)
- Visualization over time
- Multi-language support (EN/TR)
- Pagination and filtering

## How to Use?

### 1. Fork and Setup

1. **Fork this repository**:
   - Click the "Fork" button in the top-right corner to copy it to your GitHub account

2. **Create a Personal Access Token (PAT)**:
   - Click your profile picture in the top-right corner of GitHub > "Settings" > "Developer settings" > "Personal access tokens" > "Tokens (classic)"
   - Click "Generate new token" > "Generate new token (classic)"
   - Give your token a name (e.g., "Repo Traffic Viewer")
   - Select the following permissions: (admin:repo_hook, read:org, repo)
     - `repo` (full control)
     - `workflow` (to run Actions)
   - Click "Generate token"
   - **Save the generated token somewhere safe** – it will only be shown once!

3. **Add the token as a Repository Secret**:
   - Go to your forked repository > "Settings" > "Secrets and variables" > "Actions"
   - Click "New repository secret"
   - Enter `PERSONAL_ACCESS_TOKEN` in the Name field
   - Paste your token in the Value field
   - Click "Add secret"

4. **Enable GitHub Pages**:
   - In your forked repository, go to "Settings" > "Pages"
   - Under "Source", select "Deploy from a branch"
   - Select "main" as the branch and "/docs" as the folder
   - Click Save

5. **Run Actions manually (for initial data collection)**:
   - Go to the "Actions" tab in your forked repository
   - Select the "GitHub Traffic Data Collector" workflow
   - Click "Run workflow" to trigger it manually
   - This will collect the initial data

6. **Your page is ready!**:
   - After a few minutes, you can access it at `https://[YOUR-USERNAME].github.io/github-repo-traffic-viewer/`
   - Data will be updated automatically every hour

### 2. Adding a New Language

To use the repository in your own language:

1. Open the `index.html` file
2. Find the `translations` object (line ~130 in script.js)
3. Add a new language block, for example for Spanish:

```javascript
es: {
    title: "Estadísticas de tráfico de repositorios",
    loadingAuth: "Verificando sesión de GitHub...",
    // Add other translations...
}
```

4. Add a button to the language switcher (line ~40 in index.html):

```html
<button class="lang-btn" onclick="changeLanguage('es')">ES</button>
```

### 3. Development and Customization

- **Change theme**: Modify the color codes in the `style` tags
- **New features**: Add new charts by editing the JavaScript code (inside the `script` tag)
- **API integrations**: Add new data using the GitHub API

## Frequently Asked Questions

### ❓ How often is the data updated?
- By default, it updates every hour (`cron: '0 * * * *'`).
- You can change the frequency by editing the `fetch-traffic.yml` file.

### ❓ Why can't I see any data?
1. Check if your PAT has the correct permissions (`repo` and `workflow`)
2. Make sure the workflow has run successfully in the Actions tab
3. Ensure you've triggered the workflow manually on the first run

### ❓ Where is the data stored?
- All data is stored in JSON format under the `docs/data/` folder
- These files are publicly visible on GitHub, but they only contain traffic data for your repositories

## Why Should You Fork This?

✔️ **Privacy**: Your traffic data is processed only in your browser  
✔️ **Customization**: Add your own language and visual theme  
✔️ **Continuous Access**: Even if the original repo is deleted, your fork continues to work  
✔️ **Development**: Improve the tool according to your own needs  

## Contributing

If you'd like to improve this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add some awesome feature'`)
4. Push to your branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note**: This tool only shows traffic data for the forking user's own repositories. It does not display data for other users.

## ☕ Support

If you like my project, you can support me by buying me a coffee!

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/metatronslove)

Thank you! 🙏
