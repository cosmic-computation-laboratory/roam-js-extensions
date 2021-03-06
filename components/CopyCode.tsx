import { useState } from "react";
import { frontMatter as frontMatters } from "../pages/docs/extensions/*.mdx";
import { pathToId } from "./ExtensionLayout";

const copyCode = (e) => {
  const scripts = frontMatters
    .map((f) => `addScript("${pathToId(f.__resourcePath)}");`)
    .join("\n");
  e.clipboardData.setData(
    "text/plain",
    `- {{[[roam/js]]}}
  - \`\`\`javascript
      const addScript = name => {
        var old = document.getElementById(name);
        if (old) {
          return;
        }  
        var s = document.createElement('script');      
        s.type = \"text/javascript\";
        s.src = \`https://roamjs.com/\$\{name\}.js\`;
        s.async = true;
        s.id = name;
        document.getElementsByTagName('head')[0].appendChild(s);
      }
      
      ${scripts}
\`\`\`
`
  );
  e.preventDefault();
};

const CopyCode = () => {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        title="All Extensions"
        onClick={() => {
          document.addEventListener("copy", copyCode);
          document.execCommand("copy");
          document.removeEventListener("copy", copyCode);
          setCopied(true);
        }}
        style={{
          backgroundColor: "#fafbfc",
          border: "1px solid #1b1f2326",
          color: "#24292e",
          padding: "5px 16px",
          fontSize: 14,
          fontWeight: 500,
          fontFamily:
            "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
          borderRadius: 6,
          marginBottom: 24,
          cursor: "pointer",
        }}
      >
        Copy Code
      </button>
      {copied && <span style={{ marginLeft: 16 }}>Copied!</span>}
    </>
  );
};

export default CopyCode;
