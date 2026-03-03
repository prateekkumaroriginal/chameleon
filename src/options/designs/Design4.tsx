import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useRules, useArchivedRules } from "@/hooks/useRules";
import { Palette } from "lucide-react";

const Design4RulesList = () => {
  const { rules, toggle } = useRules();
  const navigate = useNavigate();
  return (
    <div className="design-4-content">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-5xl font-bold bg-linear-to-r from-[#5b4dff] to-[#ff6b6b] text-transparent bg-clip-text pb-2">Appearance</h1>
          <p className="text-gray-500 font-light mt-2 text-lg">Beautify your web experience effortlessly.</p>
        </div>
        <div className="flex gap-4">
          <button className="design-4-btn bg-white/50 text-gray-700" onClick={() => navigate('archived')}>Recycle Bin</button>
          <button className="design-4-btn" onClick={() => navigate('new')}>+ Add Theme</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rules.map(r => (
          <div key={r.id} className="design-4-card cursor-pointer" onClick={() => navigate(`edit/${r.id}`)}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-500 shadow-inner">
                <Palette size={24} />
              </div>
              <div onClick={e => { e.stopPropagation(); toggle(r.id, !r.enabled); }} className={`design-4-toggle ${r.enabled ? 'active' : ''}`}>
                <div className="design-4-toggle-thumb" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1 truncate text-gray-800">{r.name}</h3>
            <div className="inline-block px-3 py-1 bg-white/60 rounded-full text-xs font-semibold text-indigo-600 backdrop-blur-sm border border-white">
              {r.domain}
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
  
  const [name, setName] = useState(isNew ? "" : "Sample Theme");
  const [domain, setDomain] = useState(isNew ? "" : "example.com");
  const [cssText, setCssText] = useState(isNew ? "" : "body { filter: hue-rotate(90deg); }");
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="design-4-content max-w-3xl">
      <div className="flex items-center justify-between mb-8">
         <h2 className="text-4xl form-title font-bold text-gray-800">{isNew ? 'New Theme' : 'Edit Theme'}</h2>
         <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium">{enabled ? 'Active' : 'Inactive'}</span>
            <div onClick={() => setEnabled(!enabled)} className={`design-4-toggle ${enabled ? 'active' : ''}`}>
              <div className="design-4-toggle-thumb" />
            </div>
         </div>
      </div>

      <div className="design-4-card space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 ml-1">Theme Name</label>
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="design-4-input text-lg" 
            placeholder="e.g. Midnight Mode"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 ml-1">Target Website</label>
          <input 
            type="text" 
            value={domain}
            onChange={e => setDomain(e.target.value)}
            className="design-4-input text-lg" 
            placeholder="e.g. google.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 ml-1">Custom CSS</label>
          <textarea 
            value={cssText}
            onChange={e => setCssText(e.target.value)}
            className="design-4-input font-mono text-sm min-h-[250px] resize-y" 
            placeholder="/* Write your beautiful CSS here */"
            spellCheck="false"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button onClick={() => navigate('..')} className="text-gray-500 hover:text-red-500 font-semibold transition-colors px-4 py-2 rounded-full hover:bg-red-50">Cancel</button>
        <button onClick={() => navigate('..')} className="design-4-btn text-lg px-8">Save Changes</button>
      </div>
    </div>
  );
};

const ArchivedList = () => {
  const { rules } = useArchivedRules();
  const navigate = useNavigate();

  return (
    <div className="design-4-content">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Recycle Bin</h1>
          <p className="text-gray-500 font-light mt-2">Restore or permanently delete themes.</p>
        </div>
        <button onClick={() => navigate('..')} className="design-4-btn bg-white/50 text-gray-700">Back</button>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {rules.map(r => (
          <div key={r.id} className="design-4-card flex flex-col md:flex-row justify-between items-center gap-4 bg-white/30">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-200/50 flex items-center justify-center text-gray-500">
                <Palette size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-700">{r.name}</h3>
                <div className="text-sm font-semibold text-gray-500">{r.domain}</div>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
               <button className="flex-1 md:flex-none py-2 px-6 rounded-full font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 transition-colors">Restore</button>
               <button className="flex-1 md:flex-none py-2 px-6 rounded-full font-bold text-red-600 bg-red-50/50 hover:bg-red-100 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Design4() {
  return (
    <div className="design-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap');
        .design-4 { font-family: 'Outfit', sans-serif; background: radial-gradient(circle at 50% 0%, #e8e3ff 0%, #ffffff 60%, #f0f8ff 100%); min-height: 100vh; color: #3c3854; position: relative; overflow-x: hidden; }
        .design-4::before { content: ''; position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255,192,203,0.4) 0%, transparent 70%); top: -200px; left: -200px; border-radius: 50%; filter: blur(60px); z-index: 0; pointer-events: none; }
        .design-4::after { content: ''; position: absolute; width: 500px; height: 500px; background: radial-gradient(circle, rgba(176,224,230,0.6) 0%, transparent 70%); bottom: -100px; right: -100px; border-radius: 50%; filter: blur(50px); z-index: 0; pointer-events: none; }
        .design-4-content { position: relative; z-index: 10; max-w: 1200px; margin: 0 auto; padding: 2rem; }
        .design-4-card { background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 24px; padding: 1.5rem; box-shadow: 0 10px 40px rgba(0,0,0,0.03); transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .design-4-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 50px rgba(100,100,255,0.08); background: rgba(255, 255, 255, 0.7); }
        .design-4-btn { background: rgba(255, 255, 255, 0.9); border: none; padding: 0.8rem 1.5rem; border-radius: 99px; font-weight: 600; color: #5b4dff; box-shadow: 0 4px 15px rgba(91, 77, 255, 0.15); cursor: pointer; transition: 0.3s; }
        .design-4-btn:hover { background: #5b4dff; color: white; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(91, 77, 255, 0.3); }
        .design-4-toggle { width: 44px; height: 24px; border-radius: 24px; background: rgba(0,0,0,0.1); position: relative; cursor: pointer; transition: 0.3s; }
        .design-4-toggle.active { background: #5b4dff; }
        .design-4-toggle-thumb { width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .design-4-toggle.active .design-4-toggle-thumb { transform: translateX(20px); }
      `}</style>
      <Routes>
        <Route path="" element={<Design4RulesList />} />
        <Route path="new" element={<RuleEditor />} />
        <Route path="edit/:id" element={<RuleEditor />} />
        <Route path="archived" element={<ArchivedList />} />
      </Routes>
    </div>
  );
}
