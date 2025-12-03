import { categories, templates, languages } from './data.js';


export function renderHeader() {
    return `
        <div class="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div class="flex items-center gap-3 cursor-pointer group" onclick="window.navigateTo('home')">
                <div class="w-8 h-8 bg-banana rounded-sm flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <i data-lucide="banana" class="text-black w-5 h-5"></i>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold tracking-tight text-white leading-none group-hover:text-banana transition-colors">BananaWorks</h1>
                    <span class="text-[10px] text-gray-400 font-medium tracking-wider">PROFESSIONAL AI STUDIO</span>
                </div>
            </div>
            
            <div class="flex items-center gap-4">
                <button class="text-sm text-gray-300 hover:text-banana transition-colors hidden md:block">전체 템플릿</button>
                <div class="h-4 w-[1px] bg-gray-700 hidden md:block"></div>
                <button class="p-2 hover:bg-surface rounded-full transition-colors">
                    <i data-lucide="bell" class="w-5 h-5 text-gray-300"></i>
                </button>
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600 flex items-center justify-center cursor-pointer hover:border-banana transition-colors">
                    <span class="text-xs font-bold text-banana">U</span>
                </div>
            </div>
        </div>
    `;
}


export function renderDashboard(activeCategory = 'all') {
    const filteredTemplates = activeCategory === 'all' 
        ? templates 
        : templates.filter(t => t.category === activeCategory);


    return `
        <div class="max-w-[1600px] mx-auto px-4 pb-20">
            <!-- Category Tabs -->
            <div class="sticky top-16 z-40 bg-dark/90 backdrop-blur py-4 mb-8 border-b border-white/5">
                <div class="flex gap-6 overflow-x-auto no-scrollbar">
                    ${categories.map(cat => `
                        <button 
                            onclick="window.filterCategory('${cat.id}')"
                            class="tab-item flex items-center gap-2 px-1 pb-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                            ${activeCategory === cat.id ? 'active' : 'text-gray-500 border-transparent hover:text-white'}"
                        >
                            <i data-lucide="${cat.icon}" class="w-4 h-4"></i>
                            ${cat.name}
                        </button>
                    `).join('')}
                </div>
            </div>


            <!-- Feature Banner -->
            <div id="magic-banner" class="magic-banner rounded-xl p-8 mb-12 relative overflow-hidden group opacity-0">
                <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-blue/10 to-transparent"></div>
                <div class="relative z-10 max-w-2xl">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="px-2 py-0.5 bg-neon-pink/20 text-neon-pink text-[10px] font-bold rounded border border-neon-pink/30 animate-pulse">NEW FEATURE</span>
                    </div>
                    <h2 class="text-3xl font-bold mb-2 text-white">AI 매직 에디터</h2>
                    <p class="text-gray-300 mb-6 max-w-lg">생성된 이미지의 특정 영역을 마스킹하여 부분 수정하거나 확장해보세요.</p>
                    <button class="bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-banana transition-colors flex items-center gap-2">
                        체험하기 <i data-lucide="wand-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>


            <!-- Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
                ${filteredTemplates.map(t => `
                    <div onclick="window.navigateTo('workspace', ${t.id})" 
                         class="template-card bg-surface rounded-lg overflow-hidden cursor-pointer group relative">
                        <div class="aspect-video overflow-hidden bg-gray-800 relative">
                            <img src="${t.image}" alt="${t.title}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                            <div class="hover-overlay absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
                                <span class="px-4 py-2 border border-banana text-banana rounded text-sm font-bold bg-black/50">사용하기 -></span>
                            </div>
                        </div>
                        <div class="p-4 border-t border-white/5">
                            <h3 class="font-bold text-gray-100 mb-1 truncate">${t.title}</h3>
                            <p class="text-xs text-gray-400 line-clamp-2 h-8">${t.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}


export function renderWorkspace(templateId, selectedModel = 'nano') {
    const template = templates.find(t => t.id == templateId) || templates[0];


    return `
        <div class="flex h-[calc(100vh-64px)] overflow-hidden relative">
            <!-- Left Panel: Controls -->
            <aside id="workspace-controls" class="w-full md:w-[360px] bg-surface border-r border-white/5 flex flex-col overflow-y-auto custom-scrollbar z-20 shadow-xl absolute md:relative h-full">
                <div class="p-6 border-b border-white/5">
                    <div class="flex items-center gap-2 text-gray-400 text-xs mb-2 cursor-pointer hover:text-banana" onclick="window.navigateTo('home')">
                        <i data-lucide="arrow-left" class="w-3 h-3"></i> 돌아가기
                    </div>
                    <h2 class="text-xl font-bold text-white mb-1">${template.title}</h2>
                    <p class="text-sm text-gray-400 leading-relaxed">${template.desc}</p>
                </div>


                <div class="p-6 space-y-8 flex-1">
                    <!-- Model Selection -->
                    <div class="input-group">
                        <label>AI 모델 선택</label>
                        <div class="grid grid-cols-2 gap-3">
                            <div onclick="window.selectModel('nano')" id="model-nano" 
                                class="model-card border bg-dark p-3 rounded cursor-pointer relative ${selectedModel === 'nano' ? 'selected' : 'border-border hover:border-gray-500'}">
                                ${selectedModel === 'nano' ? '<div class="absolute top-2 right-2 w-2 h-2 bg-banana rounded-full"></div>' : ''}
                                <span class="block text-xs ${selectedModel === 'nano' ? 'text-banana' : 'text-gray-500'} font-bold mb-1">Standard</span>
                                <span class="block text-sm font-bold ${selectedModel === 'nano' ? 'text-white' : 'text-gray-300'}">NanoBanana</span>
                            </div>
                            <div onclick="window.selectModel('pro')" id="model-pro" 
                                class="model-card border bg-dark p-3 rounded cursor-pointer relative ${selectedModel === 'pro' ? 'selected' : 'border-border hover:border-gray-500'}">
                                ${selectedModel === 'pro' ? '<div class="absolute top-2 right-2 w-2 h-2 bg-banana rounded-full"></div>' : ''}
                                <span class="block text-xs ${selectedModel === 'pro' ? 'text-banana' : 'text-gray-500'} font-bold mb-1">Pro (HQ)</span>
                                <span class="block text-sm font-bold ${selectedModel === 'pro' ? 'text-white' : 'text-gray-300'}">BananaPro</span>
                            </div>
                        </div>
                    </div>


                    <!-- Text Inputs -->
                    <div class="input-group">
                        <div class="flex justify-between items-center mb-2">
                            <label class="!mb-0">추가 요청 사항</label>
                            <button onclick="window.magicPrompt()" class="text-[10px] text-neon-blue hover:text-white flex items-center gap-1 transition-colors">
                                <i data-lucide="sparkles" class="w-3 h-3"></i> AI 자동완성
                            </button>
                        </div>
                        <textarea id="prompt-area" class="custom-input h-24 resize-none custom-scrollbar" placeholder="원하는 색상 톤, 분위기 등을 자유롭게 적어주세요."></textarea>
                    </div>
                    
                    <!-- File Upload -->
                    <div class="input-group">
                        <label>레퍼런스 첨부</label>
                        <div class="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-banana hover:bg-banana/5 transition-colors cursor-pointer group">
                            <i data-lucide="upload-cloud" class="w-6 h-6 text-gray-500 group-hover:text-banana mx-auto mb-2 transition-colors"></i>
                            <p class="text-xs text-gray-400">드래그하거나 클릭하여 업로드</p>
                        </div>
                    </div>
                </div>


                <div class="p-6 border-t border-white/5 bg-surface">
                    <button onclick="window.generateImage()" id="generate-btn" class="w-full bg-banana hover:bg-banana-dark text-black font-bold py-3 rounded flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <i data-lucide="sparkles" class="w-4 h-4"></i>
                        이미지 생성하기
                    </button>
                </div>
            </aside>


            <!-- Right Panel: Viewer -->
            <main class="flex-1 bg-[#0f0f0f] relative flex items-center justify-center p-4 md:p-8 overflow-hidden h-full w-full">
                <!-- Background Grid Pattern -->
                <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#333 1px, transparent 1px); background-size: 20px 20px;"></div>


                <!-- Empty State -->
                <div id="viewer-empty" class="text-center max-w-md p-6 bg-dark/50 backdrop-blur rounded-xl border border-white/5 relative z-10">
                    <div class="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                        <i data-lucide="image" class="w-8 h-8 text-gray-600"></i>
                    </div>
                    <h3 class="text-lg font-bold text-gray-300 mb-2">이미지를 생성해보세요</h3>
                    <p class="text-gray-500 text-sm">좌측 패널에서 설정을 완료하고 '생성하기' 버튼을 누르면 AI가 전문적인 결과물을 만들어냅니다.</p>
                </div>


                <!-- Loading State (Cyberpunk Terminal) -->
                <div id="viewer-loading" class="hidden flex-col w-full max-w-2xl p-4 md:p-8 font-mono z-10">
                    <div class="flex items-center gap-2 mb-4 text-banana">
                        <div class="w-3 h-3 bg-banana rounded-full animate-ping"></div>
                        <span class="font-bold text-sm md:text-base">GENERATING ASSETS...</span>
                    </div>
                    <div class="bg-black/80 border border-green-900/50 p-4 rounded-lg h-48 overflow-hidden relative shadow-2xl shadow-green-900/20">
                        <div id="terminal-output" class="terminal-log flex flex-col justify-end h-full"></div>
                        <div class="absolute top-2 right-2 flex gap-1">
                            <div class="w-2 h-2 rounded-full bg-red-500"></div>
                            <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                </div>


                <!-- Result State -->
                <div id="viewer-result" class="hidden w-full h-full flex flex-col opacity-0 scale-95 transition-all duration-500 z-10">
                    <div class="flex-1 flex items-center justify-center relative group">
                        <img id="result-img" src="" alt="Generated Result" class="max-w-full max-h-full rounded shadow-2xl object-contain border border-white/10">
                        
                        <!-- Hover Toolbar -->
                        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur border border-white/10 rounded-full px-4 py-2 flex gap-4 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                            <button class="p-2 hover:bg-white/10 rounded-full tooltip" title="확대"><i data-lucide="zoom-in" class="w-5 h-5 text-white"></i></button>
                            <button class="p-2 hover:bg-white/10 rounded-full tooltip" title="매직 에디터"><i data-lucide="wand-2" class="w-5 h-5 text-neon-blue"></i></button>
                            <button class="p-2 hover:bg-white/10 rounded-full tooltip" title="다운로드"><i data-lucide="download" class="w-5 h-5 text-banana"></i></button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;
}
