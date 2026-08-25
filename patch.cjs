const fs = require('fs');
let content = fs.readFileSync('src/components/ContactView.tsx', 'utf8');

const target1 = `const [name, setName] = useState("");
  const [email, setEmail] = useState("");`;
const replacement1 = `const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");`;
content = content.replace(target1, replacement1);

const target2 = `const fullMessage = \`Name: \${name}\\nPhone: \${phone || "N/A"}\\nEmail: \${email || "N/A"}\\n\\n\${message}\`;`;
const replacement2 = `const fullMessage = \`Name: \${name}\\nCompany: \${companyName || "N/A"}\\nPhone: \${phone || "N/A"}\\nEmail: \${email || "N/A"}\\n\\n\${message}\`;`;
content = content.replace(target2, replacement2);

const target3 = `\`Name: \${name}\\nPhone: \${phone || "N/A"}\\n\\n\${message}\``;
const replacement3 = `\`Name: \${name}\\nCompany: \${companyName || "N/A"}\\nPhone: \${phone || "N/A"}\\n\\n\${message}\``;
content = content.replace(target3, replacement3);

const target4 = `<div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-zinc-400">Your Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none focus:border-yellow-500/40" />
            </div>`;
const replacement4 = `<div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-zinc-400">Your Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none focus:border-yellow-500/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-zinc-400">Company Name (Optional)</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none focus:border-yellow-500/40" />
            </div>`;
content = content.replace(target4, replacement4);

fs.writeFileSync('src/components/ContactView.tsx', content);
