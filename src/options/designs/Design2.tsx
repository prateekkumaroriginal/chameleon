import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useRules, useArchivedRules } from "@/hooks/useRules";
import { Palette } from "lucide-react";

const Design2RulesList = () => {
  const { rules, toggle } = useRules();
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-12">
      <h1 className="design-2-heading">Atelier CSS</h1>
      <div className="flex justify-center gap-8 mb-16">
        <button className="design-2-btn" onClick={() => navigate('new')}>Curate New</button>
        <button className="design-2-btn" style={{opacity: 0.7}} onClick={() => navigate('archived')}>Archives</button>
      </div>
      <div className="space-y-8">
        {rules.map(r => (
          <div key={r.id} className="design-2-card">
            <div className="flex justify-between items-center px-8">
              <button onClick={() => toggle(r.id, !r.enabled)} className="w-[100px] text-sm tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                {r.enabled ? 'ACTIVE' : 'DORMANT'}
              </button>
              <div className="text-center cursor-pointer" onClick={() => navigate(`edit/${r.id}`)}>
                <h3 className="font-serif text-3xl mb-2 text-white">{r.name}</h3>
                <p className="text-sm tracking-widest uppercase opacity-70">{r.domain}</p>
              </div>
              <div className="w-[100px] flex justify-end">
                <Palette className="opacity-50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

const RuleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  
  const [name, setName] = useState(isNew ? "" : "Sample Rule");
  const [domain, setDomain] = useState(isNew ? "" : "example.com");
  const [cssText, setCssText] = useState(isNew ? "" : "body { background: gold !important; }");
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-12">
      <div className="flex justify-between items-center mb-12 border-b border-[#e5d09c] pb-8">
        <h2 className="font-serif text-4xl text-[#e5d09c] tracking-widest">{isNew ? "Create Design" : "Modify Design"}</h2>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setEnabled(!enabled)}>
            <div className={`w-12 h-6 rounded-full border border-[#e5d09c] flex items-center p-1 transition-all ${enabled ? 'bg-[#e5d09c]' : 'bg-transparent'}`}>
              <div className={`w-4 h-4 rounded-full transition-all ${enabled ? 'bg-[#0e0e0e] translate-x-6' : 'bg-[#e5d09c] translate-x-0'}`} />
            </div>
            <span className="text-sm tracking-widest opacity-60 uppercase">{enabled ? 'Active' : 'Dormant'}</span>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <label className="text-sm tracking-widest opacity-70 uppercase">Identifier</label>
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="design-2-input text-2xl" 
            placeholder="e.g. Dark Mode Theme"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm tracking-widest opacity-70 uppercase">Target Canvas</label>
          <input 
            type="text" 
            value={domain}
            onChange={e => setDomain(e.target.value)}
            className="design-2-input text-2xl" 
            placeholder="e.g. google.com"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm tracking-widest opacity-70 uppercase">Styling Instructions (CSS)</label>
          <div className="relative border border-opacity-30 border-[#e5d09c] p-1">
             <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#e5d09c]"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#e5d09c]"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#e5d09c]"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#e5d09c]"></div>
             <textarea 
               value={cssText}
               onChange={e => setCssText(e.target.value)}
               className="w-full bg-[#111] text-[#e5d09c] font-mono p-6 min-h-[300px] outline-none" 
               placeholder="/* Craft your masterpiece here */"
               spellCheck="false"
             />
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-[#e5d09c] border-opacity-30">
          <button onClick={() => navigate('..')} className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-red-400 transition-colors">Discard Draft</button>
          <div className="flex gap-4">
            <button onClick={() => navigate('..')} className="design-2-btn" style={{opacity: 0.6}}>Return</button>
            <button onClick={() => navigate('..')} className="design-2-btn bg-[#e5d09c] text-[#0e0e0e] hover:bg-white">Preserve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArchivedList = () => {
  const { rules } = useArchivedRules();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-12">
      <div className="flex justify-between items-center mb-16 border-b border-[#e5d09c] pb-8">
        <h1 className="font-serif text-5xl text-[#e5d09c] tracking-widest">The Vault</h1>
        <button className="design-2-btn" onClick={() => navigate('..')}>Exit Vault</button>
      </div>

      <div className="space-y-8">
        {rules.map(r => (
          <div key={r.id} className="design-2-card" style={{opacity: 0.8, filter: 'grayscale(0.5)'}}>
            <div className="flex justify-between items-center px-8">
              <div className="text-left">
                <h3 className="font-serif text-2xl mb-1 text-white">{r.name}</h3>
                <p className="text-xs tracking-widest uppercase opacity-50">{r.domain}</p>
              </div>
              <div className="flex gap-6">
                 <button className="text-xs uppercase tracking-widest text-[#e5d09c] border-b border-transparent hover:border-[#e5d09c] transition-all pb-1">Restore to Atelier</button>
                 <button className="text-xs uppercase tracking-widest text-red-900 border-b border-transparent hover:border-red-900 transition-all pb-1 hover:text-red-500">Obliterate</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Design2() {
  return (
    <div className="design-2">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Montserrat:wght@300;400&display=swap');
        .design-2 { font-family: 'Montserrat', sans-serif; background-color: #0e0e0e; color: #e5d09c; min-height: 100vh; }
        .design-2-heading { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; text-align: center; border-bottom: 2px solid #e5d09c; border-top: 2px solid #e5d09c; padding: 1rem 0; margin-bottom: 2rem; }
        .design-2-card { border: 1px solid rgba(229,208,156,0.2); padding: 2rem; text-align: center; transition: all 0.5s; background: linear-gradient(135deg, rgba(229,208,156,0.05), transparent); position: relative; }
        .design-2-card::before { content: ''; position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; border: 1px solid rgba(229,208,156,0.1); pointer-events: none; }
        .design-2-card:hover { border-color: #e5d09c; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: translateY(-5px); }
        .design-2-btn { background: transparent; border: 1px solid #e5d09c; color: #e5d09c; padding: 0.75rem 2rem; font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; letter-spacing: 0.1em; transition: 0.3s; text-transform: uppercase; cursor: pointer; }
        .design-2-btn:hover { background: #e5d09c; color: #0e0e0e; }
        .design-2-input { background: transparent; border: none; border-bottom: 1px solid rgba(229,208,156,0.5); color: #fff; padding: 1rem 0; width: 100%; font-family: 'Montserrat', sans-serif; outline: none; transition: 0.3s; }
        .design-2-input:focus { border-color: #e5d09c; }
      `}</style>
      <Routes>
        <Route path="" element={<Design2RulesList />} />
        <Route path="new" element={<RuleEditor />} />
        <Route path="edit/:id" element={<RuleEditor />} />
        <Route path="archived" element={<ArchivedList />} />
      </Routes>
    </div>
  );
}
