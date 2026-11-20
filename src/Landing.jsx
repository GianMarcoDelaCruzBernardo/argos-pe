import { useState, useEffect, useRef } from 'react'; import { motion, useInView } from 'framer-motion';
import { Eye, ShieldCheck, Cpu, Volume2, CloudOff, Camera, FileCheck, ArrowRight, ArrowUpRight, Check, Lock, Scale, Recycle, HardHat, Plus, Minus, Zap, Sun, Moon, Building2, Mountain, Factory, Menu, X } from 'lucide-react'; import './landing.css';
const U = (id, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG = { hero: U('photo-1504307651254-35680f356dfd'), con: U('photo-1541888946425-d81bb19240f5', 1000), min: U('photo-1578319439584-104c94d37305', 1000), man: U('photo-1565514020179-026b92b84bb6', 1000), cta: U('photo-1503387762-592deb58ef4e') };
const Im = ({ s, c = '' }) => <img className={'im ' + c} src={s} alt="" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />;
const fd = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: .6, delay: d } });
const WA = '51999999999'; // <-- CAMBIA por tu WhatsApp (51 + número)
const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const PL = [
  { n: 'Esencial', p: 249, s: 'Una obra o planta pequeña', f: ['1 cámara', 'Casco y chaleco', 'Dashboard LAN y nube', 'Evidencia 90 días'] },
  { n: 'Profesional', p: 499, a: 4990, s: 'El plan de mayor valor', hot: 1, f: ['Hasta 3 cámaras', 'Casco, chaleco, lentes y guantes', 'App móvil + Modo Ronda', 'Evidencia 12 meses'] },
  { n: 'Enterprise', p: 1290, s: 'Desde · multi-obra con SLA', f: ['Cámaras ilimitadas', 'Botas + control RFID', 'API y gestión multi-obra', 'Edge Box + router 4G'] }];
const FAQ = [['¿Funciona sin internet?', 'Sí. Detección, alerta de voz y registro ocurren 100% en tu red interna. La nube (AWS) solo se sincroniza cuando hay conexión.'], ['¿Cuánto demora la instalación?', 'Menos de 24 horas y sin interrumpir operaciones. El kit llega configurado, listo para tu LAN.'], ['¿Cumple con la ley de datos personales?', 'Sí. Aviso visible en el ingreso, acceso restringido a SSOMA y Gerencia, y borrado automático de imágenes según el plan (Ley 29733).'], ['¿Sirve como evidencia ante SUNAFIL?', 'Cada evento guarda foto, fecha, hora exacta y zona, en reportes trazables pensados para auditoría (Ley 29783).'], ['¿Cobran por trabajador?', 'No. Se factura por obra o planta, sin importar cuántos trabajadores tengas.']];
const EV = ['08:14:22 · INGRESO PRINCIPAL · FALTA CASCO', '08:14:05 · ALMACÉN · CUMPLE EPP', '08:13:41 · ZONA DE IZAJE · FALTA CHALECO', '08:13:10 · INGRESO PRINCIPAL · CUMPLE EPP', '08:12:58 · ALMACÉN · CUMPLE EPP'];
function Count({ to, dec = 0, pre = '', suf = '' }) {
  const ref = useRef(null), on = useInView(ref, { once: true }), [v, setV] = useState(0);
  useEffect(() => { if (!on) return; let s; const f = t => { s = s || t; const p = Math.min(1, (t - s) / 1500); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }, [on]);
  return <span ref={ref}>{pre}{v.toFixed(dec)}{suf}</span>;
}
export default function Landing() {
  const [dark, setDark] = useState(localStorage.getItem('lpTheme') === 'dark'), [r, setR] = useState({ sueldo: 4000, multa: 5500 }), [f, setF] = useState({ sector: 'Construcción' }), [m, setM] = useState(''), [yr, setYr] = useState(false), [menu, setMenu] = useState(false), [q, setQ] = useState(0);
  useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; }, [menu]);
  const nav = i => { setMenu(false); setTimeout(() => go(i), 80); };
  useEffect(() => { localStorage.setItem('lpTheme', dark ? 'dark' : 'light'); }, [dark]);
  const costo = 4990 + 699, ahorro = r.sueldo * 12 * 0.3 + r.multa, roi = Math.round((ahorro - costo) / costo * 100);
  const send = e => { e.preventDefault(); const tx = `Hola, soy ${f.contacto || ''} de ${f.empresa} (${f.sector}). Correo: ${f.email || '-'}. Quiero una demo de ARGOS EPP.`; window.open(`https://wa.me/${WA}?text=${encodeURIComponent(tx)}`, '_blank'); setM('ok'); };
  return <div className="lp" data-theme={dark ? 'dark' : 'light'}>
    <header className="nav"><div className="brand"><span className="mk"><Eye size={18} /></span>ARGOS<i>EPP</i></div>
      <nav className="links">{[['solucion', 'Solución'], ['sectores', 'Sectores'], ['planes', 'Planes'], ['roi', 'ROI'], ['faq', 'FAQ']].map(([i, l]) => <button key={i} onClick={() => go(i)}>{l}</button>)}</nav>
      <div className="lact"><button className="ico" onClick={() => setDark(!dark)} aria-label="Tema">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="lbtn" onClick={() => go('piloto')}><span className="lgt">Solicitar demo</span><span className="smt">Demo</span> <ArrowUpRight size={16} /></button><button className="ico burger" onClick={() => setMenu(!menu)} aria-label="Menú">{menu ? <X size={20} /> : <Menu size={20} />}</button></div></header>
    {menu && <div className="mnav">{[['solucion', 'Solución'], ['sectores', 'Sectores'], ['planes', 'Planes'], ['roi', 'ROI'], ['faq', 'FAQ']].map(([i, l], n) => <button key={i} onClick={() => nav(i)}><em>0{n + 1}</em>{l}</button>)}<button className="lbtn big" onClick={() => nav('piloto')}>Solicitar demo <ArrowRight size={18} /></button></div>}

    <section className="hero"><div className="hl"><motion.span className="lab" {...fd()}>DETECCIÓN DE EPP · IA LOCAL · SIN INTERNET</motion.span>
      <motion.h1 {...fd(.05)}>Ningún trabajador entra <mark>sin protección.</mark></motion.h1>
      <motion.p {...fd(.1)}>ARGOS EPP verifica casco, chaleco, lentes, guantes y botas en cada ingreso, avisa por voz y deja evidencia lista para SUNAFIL. Instalado en menos de 24 horas.</motion.p>
      <motion.div className="lrow" {...fd(.15)}><button className="lbtn big" onClick={() => go('piloto')}>Quiero el piloto <ArrowRight size={18} /></button><button className="lbtn line big" onClick={() => go('solucion')}>Ver la solución</button></motion.div></div>
      <div className="hr"><Im s={IMG.hero} />
        <div className="bx b1"><span>CASCO ✕ 0.97</span></div><div className="bx b2 ok"><span>CHALECO ✓ 0.94</span></div>
        <div className="vc"><Volume2 size={16} /> “Trabajador, colóquese el casco”</div><div className="kp"><b>96.4%</b><span>cumplimiento EPP · Torre Trujillo Centro</span></div></div></section>
    <div className="tick"><div>{[...EV, ...EV, ...EV].map((e, i) => <span key={i}><i />{e}</span>)}</div></div>

    <section className="stats">{[[77.7, 1, '', '%', 'interés alto en el mercado'], [81.5, 1, '', '%', 'valora el modo offline'], [88.3, 1, '', '%', 'tomaría el piloto'], [24, 0, '< ', ' h', 'instalación en obra']].map(([n, d, p, x, b]) => <div key={b}><b><Count to={n} dec={d} pre={p} suf={x} /></b><span>{b}</span></div>)}</section>

    <section id="solucion" className="sec split"><div className="stick"><span className="lab">01 — LA SOLUCIÓN</span><h2>Una multa SUNAFIL cuesta hasta S/ 288,915. Cada ingreso, ahora comprobado.</h2><p>Una infracción muy grave puede llegar a 52.53 UIT. ARGOS convierte cada ingreso en evidencia verificable.</p>
      <motion.div className="vis" {...fd(.1)}><Im s={IMG.hero} /><div className="scn" /><i className="cr tl" /><i className="cr tr" /><i className="cr bl" /><i className="cr br" />
        <span className="tg t1"><Check size={12} /> CASCO 0.97</span><span className="tg t2"><Check size={12} /> CHALECO 0.94</span><span className="tg t3 bad"><X size={12} /> GUANTES 0.88</span>
        <div className="vbar"><span><i className="dot" />ANALIZANDO · EN VIVO</span><b>0.12 s</b></div></motion.div>
      <div className="mini">{[['5', 'EPP verificados'], ['0.12 s', 'por detección'], ['1', 'alerta por persona']].map(([a, b]) => <div key={b}><b>{a}</b><span>{b}</span></div>)}</div></div>
      <div className="rows">{[[Camera, 'Visión artificial en el ingreso', 'YOLOv8n + OpenVINO con tracking: una sola alerta por trabajador, sin duplicados.'], [Volume2, 'Alerta de voz específica', '“Colóquese el casco”: el trabajador se corrige antes de entrar.'], [CloudOff, 'Offline-first', 'Opera sin internet y sincroniza con AWS cuando vuelve la conexión.'], [FileCheck, 'Reportes listos para SUNAFIL', 'Foto, fecha, hora exacta y zona en cada evento.'], [Lock, 'Privacidad por diseño', 'Aviso visible, acceso restringido y borrado automático (Ley 29733).'], [Cpu, 'Hardware plug & play', 'Kit con cámara ESP32-S3-CAM, nodo de alarma y carcasa IP. Edge Box para 24/7.']].map(([I, t, d], i) => <motion.div key={t} className="rw" {...fd(i * .04)}><I size={26} /><div><h3>{t}</h3><p>{d}</p></div><ArrowUpRight size={20} className="ar" /></motion.div>)}</div></section>

    <section id="sectores" className="sec nopad"><div className="shd"><span className="lab">02 — SECTORES</span><h2>Hecho para donde el riesgo es real</h2></div>
      <div className="g3 sct">{[[IMG.con, Building2, 'Construcción', 'Control en puertas de obra y cambios de turno.'], [IMG.min, Mountain, 'Minería', 'Monitoreo continuo 24/7 con Edge Box.'], [IMG.man, Factory, 'Manufactura', 'Verificación por zona de planta, con trazabilidad.']].map(([s, I, t, d]) => <div key={t} className="sc"><Im s={s} /><div className="ov"><I size={22} /><h3>{t}</h3><p>{d}</p></div></div>)}</div></section>

    <section className="sec"><div className="shd"><span className="lab">03 — CÓMO FUNCIONA</span><h2>De la cámara a la evidencia, en segundos</h2></div>
      <div className="steps">{[[Camera, 'Captura', 'Cámara ESP32-S3-CAM en el punto de ingreso.'], [Cpu, 'Detecta', 'IA local con tracking anti-duplicados.'], [Volume2, 'Alerta', 'Relé y parlante indican qué falta.'], [FileCheck, 'Registra', 'Foto, hora y zona en SQLite, luego AWS.']].map(([I, t, d], i) => <div key={t} className="st"><em>0{i + 1}</em><I size={26} /><h3>{t}</h3><p>{d}</p></div>)}</div>
      <div className="ph">{[['FASE 1 · MVP', 'Casco y chaleco'], ['FASE 2', 'Lentes y guantes'], ['FASE 3', 'Botas + RFID']].map(([a, b]) => <div key={a}><HardHat size={18} /><b>{a}</b><span>{b}</span></div>)}</div></section>

    <section id="planes" className="sec"><div className="shd"><span className="lab">04 — PLANES</span><h2>Un precio por obra. Sin sorpresas.</h2><p>Sin IGV · Kit Checkpoint S/ 699 (pago único) · Edge Box S/ 1,399 opcional</p>
      <div className="tg"><button className={!yr ? 'on' : ''} onClick={() => setYr(false)}>Mensual</button><button className={yr ? 'on' : ''} onClick={() => setYr(true)}>Anual · 2 meses gratis</button></div></div>
      <div className="g3 pl">{PL.map(p => <div key={p.n} className={'plan ' + (p.hot ? 'hot' : '')}>{p.hot && <span className="pop">MÁS ELEGIDO</span>}<h3>{p.n}</h3><small>{p.s}</small>
        <div className="pr">S/ {yr && p.a ? p.a.toLocaleString() : p.p.toLocaleString()}<em>{yr && p.a ? '/año' : '/mes'}</em></div><ul>{p.f.map(x => <li key={x}><Check size={16} />{x}</li>)}</ul>
        <button className={'lbtn ' + (p.hot ? 'inv' : 'line')} onClick={() => go('piloto')}>Elegir {p.n}</button></div>)}</div></section>

    <section id="roi" className="rz"><div><span className="lab">05 — RETORNO</span><h2>Calcula lo que ahorras</h2><label>Sueldo de supervisor SSOMA (S/ al mes)<input type="number" value={r.sueldo} onChange={e => setR({ ...r, sueldo: +e.target.value })} /></label>
      <label>Multa SUNAFIL evitada (S/)<input type="number" value={r.multa} onChange={e => setR({ ...r, multa: +e.target.value })} /></label><small>Plan Profesional anual + Kit (S/ {costo.toLocaleString()}) y 30% del tiempo de un supervisor en controles manuales.</small></div>
      <div className="big"><span>ROI PRIMER AÑO</span><b>{roi}%</b><small>Beneficio estimado S/ {ahorro.toLocaleString()}</small></div></section>

    <section id="piloto" className="pil"><Im s={IMG.cta} c="bg" /><div className="pg"><div><span className="lab">06 — PROGRAMA PILOTO</span><h2>Sé una de las 3 primeras obras</h2>
      <p>50% de descuento durante 3 meses. A cambio, autorizas tu caso de éxito y el uso de imágenes anonimizadas para mejorar el modelo de IA peruano.</p>
      <ul className="chk">{['Instalación en menos de 24 horas', 'Sin interrumpir tus operaciones', 'Soporte directo del equipo J&R SAC'].map(x => <li key={x}><Check size={16} />{x}</li>)}</ul></div>
      <form className="form" onSubmit={send}><h3>Solicita tu demo</h3><input required placeholder="Empresa" onChange={e => setF({ ...f, empresa: e.target.value })} /><input placeholder="Nombre y cargo" onChange={e => setF({ ...f, contacto: e.target.value })} />
        <input type="email" placeholder="Correo corporativo" onChange={e => setF({ ...f, email: e.target.value })} /><select value={f.sector} onChange={e => setF({ ...f, sector: e.target.value })}><option>Construcción</option><option>Manufactura</option><option>Minería</option><option>Otro</option></select>
        <button className="lbtn big">Quiero mi demo <ArrowRight size={18} /></button>{m === 'ok' && <div className="okm">¡Listo! Te contactaremos pronto.</div>}{m === 'err' && <div className="errm">No se pudo enviar, intenta de nuevo.</div>}</form></div></section>

    <section id="faq" className="sec split"><div className="stick"><span className="lab">07 — FAQ</span><h2>Preguntas frecuentes</h2>
      <motion.div className="ask" {...fd(.1)}><Im s={IMG.man} /><div className="ov2"><span className="lab2"><i className="dot" />ESPECIALISTA DISPONIBLE</span><h3>¿Tu duda no está aquí?</h3><p>Conversemos 15 minutos y calculamos cómo ARGOS se adapta a tu obra o planta.</p>
        <a className="lbtn" href={`https://wa.me/${WA}?text=${encodeURIComponent('Hola, tengo una consulta sobre ARGOS EPP.')}`} target="_blank" rel="noreferrer">Hablar por WhatsApp <ArrowUpRight size={16} /></a></div></motion.div></div>
      <div className="faq">{FAQ.map(([a, b], i) => <div key={a} className={q === i ? 'open' : ''}><button onClick={() => setQ(q === i ? -1 : i)}>{a}{q === i ? <Minus size={18} /> : <Plus size={18} />}</button>{q === i && <p>{b}</p>}</div>)}</div></section>

    <div className="hz" /><footer className="foot"><div className="lgl">{[[Scale, 'Ley 29783'], [Lock, 'Ley 29733'], [Zap, 'MTC · INDECOPI'], [Recycle, 'RAEE D.S. 009-2012']].map(([I, t]) => <span key={t}><I size={16} />{t}</span>)}</div>
      <div className="wm">ARGOS<i>EPP</i></div><div className="fl"><p>J&R SAC · Respaldo académico TECSUP · Diseño y Desarrollo de Software</p><span>Trujillo, Perú</span></div></footer></div>;
}