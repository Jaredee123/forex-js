export default {
  async scheduled(event, env) {
    const dispatchUrl =
      "https://api.github.com/repos/YOUR_ORG/YOUR_REPO/actions/workflows/update-gsheet-js.yml/dispatches";

    const res = await fetch(dispatchUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
        "Accept":        "application/vnd.github.v3+json",
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({ ref: "main" })
    });

    if (!res.ok) {
      console.error("❌ Dispatch failed:", await res.text());
    } else {
      console.log("✅ Workflow dispatched at", new Date().toISOString());
    }
  }
};

