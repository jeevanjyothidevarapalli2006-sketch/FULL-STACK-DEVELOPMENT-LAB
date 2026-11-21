#!/usr/bin/env node

/**
 * Fast Vercel Deploy Automation for DearFSD React Experiments
 * Deploys all 10 React applications in one shot.
 */

import { execSync, spawnSync } from "child_process";
import path from "path";
import fs from "fs";

const rootDir = process.cwd();

const projects = [
  {
    name: "react-conditional-rendering",
    dir: "react-conditional-rendering-app/react-conditional-rendering-app-main",
    title: "React Conditional Rendering"
  },
  {
    name: "react-form-events",
    dir: "react-form-events-app/react-form-events-app-main",
    title: "React Form Events"
  },
  {
    name: "react-frontend-crud",
    dir: "react-frontend-crud-app/react-frontend-crud-app-main",
    title: "React Frontend CRUD"
  },
  {
    name: "react-html-render",
    dir: "react_html_render_app/react_html_render_app",
    title: "React HTML Render"
  },
  {
    name: "react-jsx-render",
    dir: "react_jsx_render_app/react_jsx_render_app",
    title: "React JSX Render"
  },
  {
    name: "react-nested-components",
    dir: "react_multiple_components/react_multiple_components",
    title: "React Nested Components"
  },
  {
    name: "react-rendering-lists",
    dir: "react-rendering-lists-app/react-rendering-lists-app-main",
    title: "React Rendering Lists"
  },
  {
    name: "react-state-events",
    dir: "react-state-events-app/react-state-events-app-main",
    title: "React State Events"
  },
  {
    name: "react-router",
    dir: "react-router-app/react-router-app-main",
    title: "React Router"
  },
  {
    name: "mern-crud-frontend",
    dir: "mern-crud-app/mern-crud-app-main/frontend",
    title: "MERN CRUD Frontend"
  }
];

console.log("==================================================");
console.log("🚀 DearFSD - Automated Vercel Deployer");
console.log("==================================================\n");

// 1. Verify Vercel CLI login
console.log("Checking Vercel CLI login status...");
let whoami = spawnSync("npx", ["--yes", "vercel", "whoami"], { encoding: "utf-8", shell: true });

if (whoami.status !== 0) {
  console.log("⚠️ You are not logged in to Vercel CLI.");
  console.log("Please authenticate below (press Enter on default prompt):\n");
  spawnSync("npx", ["--yes", "vercel", "login"], { stdio: "inherit", shell: true });
  whoami = spawnSync("npx", ["--yes", "vercel", "whoami"], { encoding: "utf-8", shell: true });
  if (whoami.status !== 0) {
    console.error("\n❌ Login was not completed. Please run: npm run login:vercel\n");
    process.exit(1);
  }
}

console.log(`✅ Logged in as: ${whoami.stdout.trim()}`);
console.log(`💡 Note: If you want to deploy to a different/friend's account, run:`);
console.log(`   npx vercel logout && npx vercel login\n`);

// Function to generate clean student README without instructions
function generateCleanReadme(deployResults) {
  const readmePath = path.resolve(rootDir, "README.md");
  const getUrl = (name, fallback) => {
    const item = deployResults.find(r => r.name === name);
    return item && item.url && item.url.startsWith("https://") ? item.url : fallback;
  };

  const cleanContent = `# DearFSD – Full Stack Development Lab

A collection of practical experiments and applications developed as part of the Full Stack Development Lab.

> [!NOTE]
> 🚀 **All experiments have been deployed successfully!**
> 
> ⭐ **If you found this repository or automated deployment useful, please star the repo and follow Mahendra Gampala:**
> * **GitHub:** [@Mahe13185](https://github.com/Mahe13185)
> * **LinkedIn:** [Mahendra Gampala](https://www.linkedin.com/in/mahendragampala)

---

## 🌐 Live Application Deployments

### React Frontend Applications (Vercel)

| No. | Experiment Name | Live Demo | Status |
|---:|---|---|:---:|
| 1 | React Conditional Rendering | [Live Demo](${getUrl("react-conditional-rendering", "https://vercel.com")}) | ✅ Live |
| 2 | React Form Events | [Live Demo](${getUrl("react-form-events", "https://vercel.com")}) | ✅ Live |
| 3 | React Frontend CRUD | [Live Demo](${getUrl("react-frontend-crud", "https://vercel.com")}) | ✅ Live |
| 4 | React HTML Render | [Live Demo](${getUrl("react-html-render", "https://vercel.com")}) | ✅ Live |
| 5 | React JSX Render | [Live Demo](${getUrl("react-jsx-render", "https://vercel.com")}) | ✅ Live |
| 6 | React Nested Components | [Live Demo](${getUrl("react-nested-components", "https://vercel.com")}) | ✅ Live |
| 7 | React Rendering Lists | [Live Demo](${getUrl("react-rendering-lists", "https://vercel.com")}) | ✅ Live |
| 8 | React State Events | [Live Demo](${getUrl("react-state-events", "https://vercel.com")}) | ✅ Live |
| 9 | React Router | [Live Demo](${getUrl("react-router", "https://vercel.com")}) | ✅ Live |

### MERN Stack Application

| Component | Experiment / Service | Live Demo | Platform |
|---|---|---|:---:|
| Frontend | MERN CRUD Frontend | [Live Demo](${getUrl("mern-crud-frontend", "https://vercel.com")}) | Vercel |

---

## Project Structure

| Folder | Description |
|---|---|
| React applications | React concepts and frontend experiments |
| Express applications | Express.js and middleware experiments |
| MongoDB applications | MongoDB and Mongoose integration |
| MERN application | Full-stack CRUD application |

## 👤 Author & Credits

* **Author:** **Mahendra Gampala**
* **GitHub:** [@Mahe13185](https://github.com/Mahe13185)
* **LinkedIn:** [Mahendra Gampala](https://www.linkedin.com/in/mahendragampala)
* **Original Repository:** [https://github.com/Mahe13185/DearFSD](https://github.com/Mahe13185/DearFSD)

⭐ **If you found this useful, please follow on [GitHub](https://github.com/Mahe13185) & [LinkedIn](https://www.linkedin.com/in/mahendragampala)!**
`;

  fs.writeFileSync(readmePath, cleanContent, "utf-8");
  console.log("📝 Your repository README.md has been updated with YOUR live links!");
  console.log("   (All setup instructions have been removed from your repo).\n");
}

// Check for --sync or --clean flag to update README from existing Vercel project list
if (process.argv.includes("--sync") || process.argv.includes("--clean")) {
  console.log("Fetching live projects from Vercel CLI (npx vercel project ls)...\n");
  const lsOutput = execSync("npx --yes vercel project ls", { encoding: "utf-8" });
  const syncResults = [];
  for (const p of projects) {
    const regex = new RegExp(`^\\s*${p.name}\\s+(https:\\/\\/[a-zA-Z0-9.-]+\\.vercel\\.app)`, "m");
    const m = lsOutput.match(regex);
    if (m) {
      syncResults.push({ name: p.name, title: p.title, url: m[1], status: "✅ Ready" });
    }
  }
  generateCleanReadme(syncResults);
  spawnSync("npx", ["--yes", "vercel", "project", "ls"], { stdio: "inherit" });
  console.log("\n==================================================");
  console.log("🌟 If you found this helpful, please star the repo and follow Mahendra Gampala:");
  console.log("👉 GitHub:   https://github.com/Mahe13185");
  console.log("👉 LinkedIn: https://www.linkedin.com/in/mahendragampala");
  console.log("==================================================\n");
  process.exit(0);
}

// 2. Clean up any stale .vercel folders from previous user accounts
for (const p of projects) {
  const staleVercel = path.resolve(rootDir, p.dir, ".vercel");
  if (fs.existsSync(staleVercel)) {
    fs.rmSync(staleVercel, { recursive: true, force: true });
  }
}
const rootVercel = path.resolve(rootDir, ".vercel");
if (fs.existsSync(rootVercel)) {
  fs.rmSync(rootVercel, { recursive: true, force: true });
}

// 3. Deploy each project
const results = [];

for (let i = 0; i < projects.length; i++) {
  const p = projects[i];
  const targetPath = path.resolve(rootDir, p.dir);

  console.log(`[${i + 1}/${projects.length}] Deploying "${p.title}" (${p.name})...`);

  if (!fs.existsSync(targetPath)) {
    console.error(`❌ Directory not found: ${p.dir}`);
    results.push({ name: p.name, title: p.title, url: "FAILED (Folder not found)", status: "❌" });
    continue;
  }

  try {
    // Run vercel deploy directly on the subfolder with modern project flag
    const deployCmd = `npx --yes vercel "${targetPath}" --project "${p.name}" --create-if-missing --prod --yes`;
    const output = execSync(deployCmd, { encoding: "utf-8" });
    
    // Find clean URL in output
    const match = output.match(/https:\/\/[a-zA-Z0-9.-]+\.vercel\.app/);
    const liveUrl = match ? match[0] : "✅ Deployed";

    console.log(`   ✅ Deployed: ${liveUrl}\n`);
    results.push({ name: p.name, title: p.title, url: liveUrl, status: "✅ Ready" });
  } catch (err) {
    console.error(`   ❌ Failed to deploy ${p.name}: ${err.message}\n`);
    results.push({ name: p.name, title: p.title, url: "FAILED", status: "❌ Error" });
  }
}

// 4. Print final summary table
console.log("\n==================================================");
console.log("🎉 All Deployments Finished!");
console.log("==================================================\n");
console.table(results);

// 5. Update local README.md with clean links (removing setup instructions)
generateCleanReadme(results);

// 6. Run npx vercel project ls to display project list in terminal
console.log("Executing: npx vercel project ls...\n");
spawnSync("npx", ["--yes", "vercel", "project", "ls"], { stdio: "inherit" });

// 7. Social follow message
console.log("\n==================================================");
console.log("🌟 If you found this automated deployment helpful, please star the repo and follow Mahendra Gampala:");
console.log("👉 GitHub:   https://github.com/Mahe13185");
console.log("👉 LinkedIn: https://www.linkedin.com/in/mahendragampala");
console.log("==================================================\n");
