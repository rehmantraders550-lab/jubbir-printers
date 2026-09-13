import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Printer, 
  UploadCloud, 
  MessageCircle, 
  FileCheck2, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  Layers,
  Settings,
  Image as ImageIcon,
  ArrowRight,
  X,
  Maximize2
} from 'lucide-react';
import dtfImage from './assets/images/regenerated_image_1789311660499.jpg';

// Brand Colors
const COLORS = {
  bg: '#1A1817',
  card: '#22201F',
  primary: '#E7717D',
  success: '#AFD275',
  textLight: '#C2CAD0',
  textSand: '#C2B9B0',
};

// Pricing Constants
const MIN_ORDER = 500;

export default function App() {
  // Global State
  const [activeTab, setActiveTab] = useState<'dtf' | 'offset'>('dtf');
  
  // DTF State
  const [dtfWidth, setDtfWidth] = useState<number>(24);
  const [dtfLength, setDtfLength] = useState<number>(36);
  const [dtfQty, setDtfQty] = useState<number>(25);
  const [dtfFile, setDtfFile] = useState<File | null>(null);
  const [dtfDragActive, setDtfDragActive] = useState(false);

  // Offset State
  const [offsetCategory, setOffsetCategory] = useState<string>('Flyers');
  const [offsetPaper, setOffsetPaper] = useState<string>('130g Gloss');
  const [offsetQty, setOffsetQty] = useState<number>(1000);

  // Totals State
  const [dtfTotal, setDtfTotal] = useState<number>(0);
  const [offsetTotal, setOffsetTotal] = useState<number>(0);
  const [dtfDiscountStr, setDtfDiscountStr] = useState<string>('');

  // Showcase State
  const [showcaseTab, setShowcaseTab] = useState<'dtf' | 'offset'>('dtf');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // --- Calculations ---

  const calculateDTF = useCallback(() => {
    // Formula: (Width * Length * 0.50) * Quantity
    const area = dtfWidth * dtfLength;
    const baseTotal = area * 0.50 * dtfQty;

    // Discounts
    let discount = 0;
    let discountMsg = '';
    if (dtfQty >= 100) { discount = 0.20; discountMsg = '20% Bulk Discount Applied!'; }
    else if (dtfQty >= 50) { discount = 0.15; discountMsg = '15% Bulk Discount Applied!'; }
    else if (dtfQty >= 25) { discount = 0.10; discountMsg = '10% Bulk Discount Applied!'; }

    setDtfDiscountStr(discountMsg);
    const finalTotal = Math.max(MIN_ORDER, baseTotal * (1 - discount));
    setDtfTotal(Math.round(finalTotal));
  }, [dtfWidth, dtfLength, dtfQty]);

  const calculateOffset = useCallback(() => {
    // Formula: Setup Fee (Rs. 1,500) + (Quantity * Rs. 12 base sheet cost)
    let multiplier = 1;
    if (offsetCategory === 'Business Cards') multiplier = 0.5;
    if (offsetCategory === 'Brochures') multiplier = 2;

    const setupFee = 1500;
    const baseTotal = setupFee + (offsetQty * 12 * multiplier);
    const finalTotal = Math.max(MIN_ORDER, baseTotal);
    setOffsetTotal(Math.round(finalTotal));
  }, [offsetQty, offsetCategory, offsetPaper]);

  useEffect(() => { calculateDTF(); }, [calculateDTF]);
  useEffect(() => { calculateOffset(); }, [calculateOffset]);

  // --- Handlers ---

  const handleApplyPreset = (w: number, l: number) => {
    setDtfWidth(w);
    setDtfLength(l);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDtfDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setDtfFile(e.dataTransfer.files[0]);
    }
  };

  const scrollToCalculator = (tab: 'dtf' | 'offset') => {
    setActiveTab(tab);
    document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const sendWhatsApp = () => {
    let text = `*NEW QUOTE REQUEST - JUBBIR PRINTERS* 🖨️\n\n`;
    
    if (activeTab === 'dtf') {
      text += `*Type:* DTF Transfers\n`;
      text += `*Size:* ${dtfWidth}" x ${dtfLength}"\n`;
      text += `*Quantity:* ${dtfQty}\n`;
      if (dtfFile) text += `*Artwork:* ${dtfFile.name}\n`;
      text += `*Estimated Total:* Rs. ${dtfTotal.toLocaleString()}\n`;
    } else {
      text += `*Type:* Offset Printing\n`;
      text += `*Product:* ${offsetCategory} (${offsetPaper})\n`;
      text += `*Quantity:* ${offsetQty}\n`;
      text += `*Estimated Total:* Rs. ${offsetTotal.toLocaleString()}\n`;
    }
    
    const url = `https://wa.me/923000000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#E7717D]/30" style={{ backgroundColor: COLORS.bg, color: COLORS.textLight }}>
      
      {/* 1. GLOBAL HEADER ENHANCEMENTS */}
      <header className="border-b border-white/5 bg-[#1A1817]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ backgroundColor: `${COLORS.primary}20`, color: COLORS.primary }}>
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">JUBBIR PRINTERS</h1>
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider" style={{ color: COLORS.textSand }}>
                Estd. Gujrat, Pakistan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium">
            {/* Location Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#C2CAD0]">
              <MapPin className="w-4 h-4" style={{ color: COLORS.primary }} />
              <span>East Circular Road, Gujrat, Pakistan</span>
            </div>
            
            {/* Contact CTA */}
            <button 
              onClick={() => document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{ backgroundColor: COLORS.primary }}
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col w-full">
        
        {/* 2. HERO SECTION WITH BACKGROUND */}
        <div className="relative w-full border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <img src="banner.png" alt="Industrial Print Line" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1817]/80 via-[#1A1817]/90 to-[#1A1817]"></div>
          </div>

          <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto mb-14"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                PIONEERS OF INDUSTRIAL <br className="hidden md:block" />
                <span style={{ color: COLORS.primary }}>HIGH-VOLUME PRINTING</span>
              </h2>
              <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: COLORS.textSand }}>
                Serving Gujrat with state-of-the-art Offset & DTF solutions since 1985. We deliver uncompromising quality with massive volume savings.
              </p>
            </motion.div>

            {/* Dual Persona Pathway Cards */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {/* Card 1: DTF */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative p-8 sm:p-10 rounded-[2rem] border transition-all duration-300 group flex flex-col items-start bg-[#22201F]/80 backdrop-blur-md"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${COLORS.primary}80`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E7717D] opacity-10 blur-[60px] rounded-full pointer-events-none"></div>
                <div className="p-4 rounded-2xl mb-6" style={{ backgroundColor: `${COLORS.primary}15`, color: COLORS.primary }}>
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">DTF Transfers</h3>
                <p className="text-[#C2CAD0] mb-8 leading-relaxed text-lg">
                  Focused on micro-orders, rapid 24-hour turnarounds, custom gang sheets, and vibrant apparel printing.
                </p>
                <button 
                  onClick={() => scrollToCalculator('dtf')}
                  className="mt-auto flex items-center gap-2 font-bold group-hover:gap-4 transition-all duration-300 text-lg"
                  style={{ color: COLORS.primary }}
                >
                  Calculate DTF Price <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>

              {/* Card 2: Offset */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative p-8 sm:p-10 rounded-[2rem] border transition-all duration-300 group flex flex-col items-start bg-[#22201F]/80 backdrop-blur-md"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${COLORS.success}80`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#AFD275] opacity-10 blur-[60px] rounded-full pointer-events-none"></div>
                <div className="p-4 rounded-2xl mb-6" style={{ backgroundColor: `${COLORS.success}15`, color: COLORS.success }}>
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Offset Printing</h3>
                <p className="text-[#C2CAD0] mb-8 leading-relaxed text-lg">
                  Engineered for high-volume commercial printing. Unbeatable bulk savings on packaging, flyers, and paper stocks.
                </p>
                <button 
                  onClick={() => scrollToCalculator('offset')}
                  className="mt-auto flex items-center gap-2 font-bold group-hover:gap-4 transition-all duration-300 text-lg"
                  style={{ color: COLORS.success }}
                >
                  View Offset Pricing <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            </div>
          </section>
        </div>

        {/* 3. INTERACTIVE CAPABILITIES SHOWCASE */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Industrial Capabilities & Quality Showcase</h3>
            <p className="text-[#C2CAD0] max-w-2xl mx-auto text-lg">
              Explore our state-of-the-art production quality up close.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-12">
            <div className="flex p-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setShowcaseTab('dtf')}
                className={`py-2.5 px-6 rounded-full text-sm font-bold transition-all duration-300 ${showcaseTab === 'dtf' ? 'bg-[#E7717D] text-white shadow-lg shadow-[#E7717D]/20' : 'text-[#C2CAD0] hover:text-white'}`}
              >
                DTF Production Quality
              </button>
              <button
                onClick={() => setShowcaseTab('offset')}
                className={`py-2.5 px-6 rounded-full text-sm font-bold transition-all duration-300 ${showcaseTab === 'offset' ? 'bg-[#AFD275] text-[#1A1817] shadow-lg shadow-[#AFD275]/20' : 'text-[#C2CAD0] hover:text-white'}`}
              >
                Offset Bulk Production
              </button>
            </div>
          </div>

          {/* Image Cards */}
          <div className="max-w-4xl mx-auto relative h-[400px] sm:h-[500px]">
            <AnimatePresence mode="wait">
              {showcaseTab === 'dtf' ? (
                <motion.div
                  key="dtf-showcase"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 group cursor-pointer shadow-2xl"
                  onClick={() => setLightboxImage(dtfImage)}
                >
                  <img src={dtfImage} alt="DTF Quality" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1817] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Glowing Status */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E7717D] animate-pulse shadow-[0_0_8px_#E7717D]"></div>
                    <span className="text-white text-xs font-bold tracking-wide uppercase">Live Preview</span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-6 right-6 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>

                  {/* Hotspots */}
                  <div className="absolute bottom-[30%] left-[25%] group/hotspot">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-[#E7717D] border-2 border-white flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(231,113,125,0.6)]"></div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-max bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none">
                        300 DPI Pre-Flight Ready
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[40%] right-[30%] group/hotspot">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-[#E7717D] border-2 border-white flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(231,113,125,0.6)]" style={{animationDelay: '0.2s'}}></div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-max bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none">
                        Perfect Registration
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="offset-showcase"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 group cursor-pointer shadow-2xl"
                  onClick={() => setLightboxImage('hadi colors.png')}
                >
                  <img src="hadi colors.png" alt="Offset Quality" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1817] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Glowing Status */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#AFD275] animate-pulse shadow-[0_0_8px_#AFD275]"></div>
                    <span className="text-white text-xs font-bold tracking-wide uppercase">Live Preview</span>
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-6 right-6 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>

                  {/* Hotspots */}
                  <div className="absolute bottom-[35%] left-[35%] group/hotspot">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-[#AFD275] border-2 border-white flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(175,210,117,0.6)]"></div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-max bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none">
                        High-Fidelity Gradients
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[50%] right-[35%] group/hotspot">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-[#AFD275] border-2 border-white flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(175,210,117,0.6)]" style={{animationDelay: '0.2s'}}></div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-max bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-white text-sm font-medium opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none">
                        Moisture Resistant Coating
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 4. LOCAL SOCIAL PROOF BANNER */}
        <section className="w-full bg-[#22201F]/80 border-y border-white/5 py-10 mt-8 mb-16 backdrop-blur-md relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <p className="text-center text-xs sm:text-sm font-bold text-[#C2CAD0] uppercase tracking-[0.2em] mb-8">
              Trusted by Gujrat's Leading Textile Mills, Garment Factories & Apparel Brands
            </p>
            
            {/* Ticker / Brands Flex Container */}
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 sm:gap-x-20 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
              
              {/* GFC Fans (Stylized) */}
              <div className="flex items-center gap-1.5 select-none">
                <span className="text-3xl font-black tracking-tighter" style={{ color: COLORS.primary }}>G.F.C</span>
                <span className="text-sm font-bold tracking-widest mt-1.5 text-white">FANS</span>
              </div>

              {/* Khurshid Fans (Stylized) */}
              <div className="flex items-center select-none">
                <span className="text-3xl font-bold italic text-yellow-500 tracking-tight" style={{ textShadow: '1px 1px 0 #000' }}>Khurshid</span>
                <span className="text-sm font-bold tracking-widest ml-2 mt-1" style={{ color: COLORS.success }}>FANS</span>
              </div>

              {/* Starco (Stylized) */}
              <div className="flex items-center gap-2 select-none">
                <svg className="w-7 h-7 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <div className="flex flex-col justify-center">
                  <span className="text-2xl font-black tracking-widest leading-none text-white">STARCO</span>
                  <span className="text-[8px] tracking-[0.15em] uppercase text-gray-400 mt-0.5">when performance matters</span>
                </div>
              </div>

              {/* Generic Textile/Apparel additions to round out the banner */}
              <div className="flex items-center select-none">
                <span className="text-xl font-serif font-bold text-white/90">Gujrat Textiles</span>
              </div>

            </div>
          </div>
        </section>

        {/* CALCULATOR WIDGET (Centered) */}
        <section id="calculator-section" className="pb-24 px-4 sm:px-6 w-full relative scroll-mt-24">
          
          {/* Subtle background glow for the widget */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E7717D] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="max-w-[480px] mx-auto w-full"
          >
            <div 
              className="rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border backdrop-blur-xl"
              style={{ backgroundColor: `${COLORS.card}E6`, borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {/* Header */}
              <div className="mb-8 text-center">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: COLORS.textSand }}>
                  Instant Estimator
                </p>
                <h3 className="text-2xl font-bold text-white">Dynamic Print Calculator</h3>
              </div>

              {/* Tabs */}
              <div className="flex p-1.5 rounded-xl mb-8 bg-black/40 border border-white/5">
                <button
                  onClick={() => setActiveTab('dtf')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'dtf' ? 'bg-[#E7717D] text-white shadow-lg shadow-[#E7717D]/20' : 'text-[#C2CAD0] hover:text-white'}`}
                >
                  <Settings className="w-4 h-4" />
                  DTF Transfers
                </button>
                <button
                  onClick={() => setActiveTab('offset')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'offset' ? 'bg-white/10 text-white border border-white/20' : 'text-[#C2CAD0] hover:text-white'}`}
                >
                  <Layers className="w-4 h-4" />
                  Offset Bulk
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[380px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'dtf' ? (
                    <motion.div
                      key="dtf"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Presets */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: COLORS.textSand }}>
                          Select Size Preset
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button onClick={() => handleApplyPreset(8.27, 11.69)} className={`py-2 px-1 text-xs rounded-lg border transition-all ${dtfWidth === 8.27 && dtfLength === 11.69 ? 'border-[#E7717D] bg-[#E7717D]/10 text-white' : 'border-white/10 text-[#C2CAD0] hover:bg-white/5'}`}>
                            A4
                          </button>
                          <button onClick={() => handleApplyPreset(11.69, 16.53)} className={`py-2 px-1 text-xs rounded-lg border transition-all ${dtfWidth === 11.69 && dtfLength === 16.53 ? 'border-[#E7717D] bg-[#E7717D]/10 text-white' : 'border-white/10 text-[#C2CAD0] hover:bg-white/5'}`}>
                            A3
                          </button>
                          <button onClick={() => handleApplyPreset(24, 36)} className={`py-2 px-1 text-xs rounded-lg border transition-all flex flex-col items-center justify-center gap-1 ${dtfWidth === 24 && dtfLength === 36 ? 'border-[#AFD275] bg-[#AFD275]/10 text-[#AFD275]' : 'border-white/10 text-[#C2CAD0] hover:bg-white/5'}`}>
                            <span>24" Roll</span>
                          </button>
                        </div>
                      </div>

                      {/* Sliders */}
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span style={{ color: COLORS.textLight }}>Custom Width (Inches)</span>
                            <span className="font-bold text-white">{dtfWidth}"</span>
                          </div>
                          <input 
                            type="range" min="2" max="48" step="0.1"
                            value={dtfWidth} onChange={(e) => setDtfWidth(Number(e.target.value))}
                            className="w-full h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#E7717D]"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span style={{ color: COLORS.textLight }}>Custom Length (Inches)</span>
                            <span className="font-bold text-white">{dtfLength}"</span>
                          </div>
                          <input 
                            type="range" min="2" max="120" step="0.1"
                            value={dtfLength} onChange={(e) => setDtfLength(Number(e.target.value))}
                            className="w-full h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#AFD275]"
                          />
                        </div>
                      </div>

                      {/* Quantity */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.textSand }}>
                            Quantity
                          </label>
                          {dtfDiscountStr && (
                            <span className="text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide" style={{ backgroundColor: `${COLORS.success}20`, color: COLORS.success }}>
                              {dtfDiscountStr}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setDtfQty(Math.max(1, dtfQty - 1))} className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">-</button>
                          <input 
                            type="number" min="1" 
                            value={dtfQty} onChange={(e) => setDtfQty(Number(e.target.value) || 1)}
                            className="flex-1 h-10 bg-black/40 border border-white/10 rounded-lg text-center text-white font-bold outline-none focus:border-[#E7717D]"
                          />
                          <button onClick={() => setDtfQty(dtfQty + 1)} className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">+</button>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div 
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${dtfDragActive ? 'border-[#E7717D] bg-[#E7717D]/5' : 'border-white/10 hover:border-white/30 bg-black/20'}`}
                        onDragOver={(e) => { e.preventDefault(); setDtfDragActive(true); }}
                        onDragLeave={() => setDtfDragActive(false)}
                        onDrop={handleFileDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <input id="file-upload" type="file" className="hidden" accept=".png,.pdf,.ai" onChange={(e) => e.target.files && setDtfFile(e.target.files[0])} />
                        {dtfFile ? (
                          <div className="flex flex-col items-center gap-2">
                            <ImageIcon className="w-6 h-6" style={{ color: COLORS.success }} />
                            <span className="text-sm text-white font-medium truncate max-w-[200px]">{dtfFile.name}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <UploadCloud className="w-6 h-6" style={{ color: COLORS.textSand }} />
                            <span className="text-sm font-medium text-white">Upload Artwork (.PNG, .PDF, .AI)</span>
                            <span className="text-[10px]" style={{ color: COLORS.textLight }}>Auto-checking for 300 DPI & transparent background</span>
                          </div>
                        )}
                      </div>

                    </motion.div>
                  ) : (
                    <motion.div
                      key="offset"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: COLORS.textSand }}>
                          Product Category
                        </label>
                        <select 
                          value={offsetCategory} 
                          onChange={(e) => setOffsetCategory(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none focus:border-[#E7717D]"
                        >
                          <option value="Flyers">Flyers & Leaflets</option>
                          <option value="Business Cards">Business Cards</option>
                          <option value="Brochures">Brochures & Catalogs</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: COLORS.textSand }}>
                          Paper Quality
                        </label>
                        <select 
                          value={offsetPaper} 
                          onChange={(e) => setOffsetPaper(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none focus:border-[#E7717D]"
                        >
                          <option value="130g Gloss">130g Gloss Art Paper</option>
                          <option value="300g Matte">300g Matte Card</option>
                          <option value="Textured">Premium Textured</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: COLORS.textSand }}>
                          Quantity
                        </label>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setOffsetQty(Math.max(500, offsetQty - 500))} className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">-</button>
                          <input 
                            type="number" min="500" step="500"
                            value={offsetQty} onChange={(e) => setOffsetQty(Number(e.target.value) || 500)}
                            className="flex-1 h-10 bg-black/40 border border-white/10 rounded-lg text-center text-white font-bold outline-none focus:border-[#E7717D]"
                          />
                          <button onClick={() => setOffsetQty(offsetQty + 500)} className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">+</button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-xl bg-black/20 border border-white/5 flex items-start gap-3">
                        <Settings className="w-5 h-5 shrink-0 mt-0.5" style={{ color: COLORS.textSand }} />
                        <p className="text-xs leading-relaxed" style={{ color: COLORS.textLight }}>
                          Offset printing incurs a base setup fee of Rs. 1,500. Perfect for massive volume runs with the lowest unit cost.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Total & Action Footer */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: COLORS.textSand }}>
                      Estimated Total
                    </p>
                    <p className="text-[10px] max-w-[120px] leading-tight" style={{ color: COLORS.textLight }}>
                      No upfront payment required for quotes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
                      <span className="text-xl font-medium" style={{ color: COLORS.textSand }}>Rs.</span>
                      {activeTab === 'dtf' ? dtfTotal.toLocaleString() : offsetTotal.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={sendWhatsApp}
                  className="w-full py-4 rounded-xl font-bold text-white shadow-xl shadow-[#E7717D]/20 transition-all hover:bg-opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Quote via WhatsApp
                  <ArrowRight className="w-5 h-5 opacity-80" />
                </button>
              </div>

            </div>
          </motion.div>
        </section>

      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={lightboxImage} 
              alt="Expanded view" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

