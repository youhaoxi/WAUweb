import React, { useState, useEffect, useRef } from 'react';
import { Brain, Network, Cpu, Globe, ArrowRight, Sparkles, Menu, X, Zap, Shield, Users, Search, Languages } from 'lucide-react';

// 神经网络背景组件
const NeuralNetworkBackground = () => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // 创建节点
    const createNodes = () => {
      const nodes = [];
      const nodeCount = Math.floor((width * height) / 15000);

      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1.5,
          opacity: Math.random() * 0.5 + 0.3,
          pulse: Math.random() * Math.PI * 2
        });
      }
      return nodes;
    };

    nodesRef.current = createNodes();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 绘制连线
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.15)';
      ctx.lineWidth = 1;

      nodesRef.current.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        nodesRef.current.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.15 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      // 绘制节点
      nodesRef.current.forEach(node => {
        const pulseOpacity = node.opacity + Math.sin(node.pulse) * 0.2;

        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, `rgba(20, 184, 166, ${pulseOpacity})`);
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${pulseOpacity + 0.3})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodesRef.current = createNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
};

// 翻译数据
const translations = {
  zh: {
    nav: {
      home: '首页',
      about: '关于WAU',
      waus: 'WAUS',
      wauc: 'WAUC'
    },
    home: {
      badge: 'AI Agent 的未来已来',
      title: '探索智能体宇宙',
      subtitle: '连接无限可能',
      description: 'WAU 是一个由众多Agent组成的网络，在WAU中，我们将搜索和个性化推荐引入到AI Agent领域。WAU让不懂技术的人轻松使用AI Agent。',
      enterWAUS: '进入 WAUS',
      tryWAU: '进入 WAU',
      sectionTitle: '重新定义 AI Agent 的使用方式',
      sectionDesc: '就像 Google 改变了人找信息，TikTok 改变了信息找人，WAU 将改变 AI Agent 的发现与连接方式',
      features: [
        { title: '智能搜索', desc: '基于 Agent Card 的智能匹配，快速找到最适合你需求的 Agent' },
        { title: 'A2A 协议', desc: '标准化的 Agent-to-Agent 通信协议，实现跨框架的无缝协作' },
        { title: '即时连接', desc: '一键连接你需要的 Agent，立即开始协作，无需复杂配置' }
      ],
      agentCard: {
        title: 'Agent Card',
        subtitle: '— 智能体的名片',
        desc: '每个 Agent 都有自己独特的 Agent Card，包含能力描述、服务接口、使用示例等信息。通过标准化的 Card 格式，用户可以快速了解并连接到合适的 Agent。',
        features: ['标准化描述格式', '能力标签分类', '实时状态同步', '安全权限控制']
      },
      modulesTitle: '探索 WAU 生态',
      modulesDesc: '两大核心模块，构建完整的 Agent 生态系统',
      wausTitle: 'WAUS',
      wausShort: 'Whis Agent Universe Singularity',
      wausDesc: 'Agent 奇点 - 汇聚各类先进 Agent，打造智能体核心枢纽，提供最前沿的 AI 能力支持。',
      waucTitle: 'WAUC',
      waucShort: 'Whis Agent Universe Center',
      waucDesc: 'Agent 中心 - 全局 Agent 协调与管理平台，实现跨 Agent 的任务分配与协作。'
    },
    about: {
      badge: '关于 WAU',
      title: '重新定义 AI Agent 的',
      subtitle: '发现与连接',
      desc: '在 Google 搜索和 TikTok 之后，WAU 将成为 AI 时代的下一个范式转变',
      evolutionTitle: 'AI 搜索的进化',
      evolution: [
        { era: '2000s', title: '人找信息', example: 'Google 搜索', desc: '用户主动搜索，获取所需信息' },
        { era: '2010s', title: '信息找人', example: 'TikTok', desc: '算法推荐，信息主动触达用户' },
        { era: '2020s+', title: 'AI Agent 个性化', example: 'WAU', desc: '智能体按需匹配，提供个性化 AI 服务' }
      ],
      valuesTitle: '核心价值主张',
      values: [
        { icon: Users, title: '框架无关', desc: '支持 LangChain、LlamaIndex、CrewAI、Google ADK 等所有主流框架' },
        { icon: Shield, title: '安全可控', desc: '基于 A2A 协议的标准化安全机制，保护用户隐私' },
        { icon: Zap, title: '即时可用', desc: '标准化的 Agent Card 实现快速发现和连接' },
        { icon: Network, title: '生态互联', desc: '所有 Agent 通过 WAU 网络实现互联互通' },
        { icon: Brain, title: '智能匹配', desc: 'AI 驱动的 Agent 推荐，精准匹配用户需求' },
        { icon: Cpu, title: '高性能', desc: '优化的路由和调度机制，确保低延迟响应' }
      ],
      frameworks: '支持的开发框架'
    },
    waus: {
      badge: 'WAUS',
      title: 'Whis Agent Universe',
      subtitle: 'Singularity',
      desc: 'Agent 奇点 — 汇聚最前沿的 AI Agent，打造智能体核心枢纽',
      featuresTitle: '核心能力',
      featuredAgents: '精选 Agent',
      agentList: [
        { name: 'CodeMaster Pro', type: '编程助手', status: '在线', tags: ['代码生成', '调试', '重构'] },
        { name: 'DataInsight', type: '数据分析', status: '在线', tags: ['可视化', '统计分析'] },
        { name: 'ResearchBuddy', type: '研究助手', status: '在线', tags: ['文献搜索', '总结'] },
        { name: 'CreativeGen', type: '创意生成', status: '在线', tags: ['文案', '设计', '视频'] }
      ],
      stats: [
        { value: '1000+', label: '活跃 Agent' },
        { value: '50+', label: '能力类别' },
        { value: '99.9%', label: '可用性' },
        { value: '<50ms', label: '平均延迟' }
      ]
    },
    wauc: {
      badge: 'WAUC',
      title: 'Whis Agent Universe',
      subtitle: 'Center',
      desc: 'Agent 中心 — 全局协调与管理平台，实现跨 Agent 的智能协作',
      archTitle: 'WAUC 架构',
      flow: [
        { title: '用户请求', icon: Users },
        { title: 'Agent 匹配', icon: Search },
        { title: 'A2A 通信', icon: Network },
        { title: '结果返回', icon: Zap }
      ],
      featuresTitle: '核心功能',
      features: [
        {
          title: '智能路由',
          desc: '基于请求内容智能路由到最合适的 Agent，优化服务质量',
          list: ['负载均衡', '故障转移', '延迟优化']
        },
        {
          title: 'Agent 注册与发现',
          desc: '标准化的 Agent 注册机制，支持灵活的查询和发现',
          list: ['实时状态', '能力索引', '版本管理']
        },
        {
          title: 'A2A 协议网关',
          desc: '统一的 A2A 协议实现，确保跨框架的互操作性',
          list: ['消息转换', '安全认证', '流量控制']
        },
        {
          title: '监控与日志',
          desc: '全面的监控和日志系统，保障服务可靠性',
          list: ['请求追踪', '性能指标', '异常告警']
        }
      ],
      apiTitle: '核心 API 接口'
    },
    welcome: {
      title: '欢迎来到 WAU',
      subtitle: 'AI Agent 网络的未来',
      description: '一个由智能体组成的分布式网络，通过 A2A 协议实现无缝连接。体验跨框架的智能协作。',
      enter: '进入 WAU'
    },
    footer: {
      tagline: '连接智能体，连接未来',
      product: '产品',
      resources: '资源',
      contact: '联系方式',
      productItems: ['WAUS - Agent 奇点', 'WAUC - Agent 中心', 'Agent Card', 'A2A 协议'],
      resourceItems: ['文档中心', '开发者 API', '示例代码', '社区论坛'],
      contactItems: ['Email: contact@wau.ai', 'GitHub: github.com/wau', 'Twitter: @WAU_AI', 'Discord: discord.gg/wau'],
      copyright: '© 2024 WAU. All rights reserved.',
      links: ['隐私政策', '服务条款', '技术协议']
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About WAU',
      waus: 'WAUS',
      wauc: 'WAUC'
    },
    home: {
      badge: '',
      title: 'Explore the Agent Universe',
      subtitle: 'Connect Infinite Possibilities',
      description: 'WAU is a network of Agents. In WAU, we bring search and personalized recommendations to the AI Agent domain. WAU makes it easy for non-technical people to use AI Agents.',
      enterWAUS: 'Enter WAUS',
      tryWAU: 'Try to access WAU',
      sectionTitle: 'Redefining AI Agent Usage',
      sectionDesc: 'Just as Google changed information retrieval and TikTok changed content distribution, WAU will transform how AI Agents are discovered and connected',
      features: [
        { title: 'Smart Search', desc: 'Intelligent Agent Card-based matching to find the perfect Agent for your needs' },
        { title: 'A2A Protocol', desc: 'Standardized Agent-to-Agent communication protocol for seamless cross-framework collaboration' },
        { title: 'Instant Connection', desc: 'One-click connection to your needed Agent, immediate collaboration without complex setup' }
      ],
      agentCard: {
        title: 'Agent Card',
        subtitle: '— The Identity of Agents',
        desc: 'Each Agent has its unique Agent Card, containing capability descriptions, service interfaces, usage examples, and more. Through standardized Card format, users can quickly understand and connect to suitable Agents.',
        features: ['Standardized Description Format', 'Capability Tagging', 'Real-time Status Sync', 'Security Access Control']
      },
      modulesTitle: 'Explore WAU Ecosystem',
      modulesDesc: 'Two core modules building a complete Agent ecosystem',
      wausTitle: 'WAUS',
      wausShort: 'Whis Agent Universe Singularity',
      wausDesc: 'Agent Singularity — Gathering cutting-edge AI Agents to create an Agent core hub with the most advanced AI capabilities.',
      waucTitle: 'WAUC',
      waucShort: 'Whis Agent Universe Center',
      waucDesc: 'Agent Center — Global Agent coordination and management platform for cross-Agent task allocation and collaboration.'
    },
    about: {
      badge: 'About WAU',
      title: 'Redefining AI Agent',
      subtitle: 'Discovery & Connection',
      desc: 'After Google Search and TikTok, WAU will be the next paradigm shift in the AI era',
      evolutionTitle: 'Evolution of AI Search',
      evolution: [
        { era: '2000s', title: 'People Find Info', example: 'Google Search', desc: 'Users actively search for needed information' },
        { era: '2010s', title: 'Info Finds People', example: 'TikTok', desc: 'Algorithm recommendation, information reaches users proactively' },
        { era: '2020s+', title: 'AI Agent Personalization', example: 'WAU', desc: 'On-demand Agent matching for personalized AI services' }
      ],
      valuesTitle: 'Core Value Proposition',
      values: [
        { icon: Users, title: 'Framework Agnostic', desc: 'Support for all mainstream frameworks including LangChain, LlamaIndex, CrewAI, Google ADK' },
        { icon: Shield, title: 'Secure & Controlled', desc: 'Standardized security mechanisms based on A2A protocol, protecting user privacy' },
        { icon: Zap, title: 'Instant Availability', desc: 'Standardized Agent Card for rapid discovery and connection' },
        { icon: Network, title: 'Ecosystem Connectivity', desc: 'All Agents interconnected through the WAU network' },
        { icon: Brain, title: 'Smart Matching', desc: 'AI-driven Agent recommendations for precise user need matching' },
        { icon: Cpu, title: 'High Performance', desc: 'Optimized routing and scheduling for low-latency responses' }
      ],
      frameworks: 'Supported Development Frameworks'
    },
    waus: {
      badge: 'WAUS',
      title: 'Whis Agent Universe',
      subtitle: 'Singularity',
      desc: 'Agent Singularity — Gathering cutting-edge AI Agents to create an Agent core hub',
      featuresTitle: 'Core Capabilities',
      featuredAgents: 'Featured Agents',
      agentList: [
        { name: 'CodeMaster Pro', type: 'Coding Assistant', status: 'Online', tags: ['Code Generation', 'Debugging', 'Refactoring'] },
        { name: 'DataInsight', type: 'Data Analysis', status: 'Online', tags: ['Visualization', 'Statistics'] },
        { name: 'ResearchBuddy', type: 'Research Assistant', status: 'Online', tags: ['Literature Search', 'Summarization'] },
        { name: 'CreativeGen', type: 'Creative Generation', status: 'Online', tags: ['Copywriting', 'Design', 'Video'] }
      ],
      stats: [
        { value: '1000+', label: 'Active Agents' },
        { value: '50+', label: 'Capability Categories' },
        { value: '99.9%', label: 'Uptime' },
        { value: '<50ms', label: 'Avg Latency' }
      ]
    },
    wauc: {
      badge: 'WAUC',
      title: 'Whis Agent Universe',
      subtitle: 'Center',
      desc: 'Agent Center — Global coordination and management platform for intelligent cross-Agent collaboration',
      archTitle: 'WAUC Architecture',
      flow: [
        { title: 'User Request', icon: Users },
        { title: 'Agent Match', icon: Search },
        { title: 'A2A Communication', icon: Network },
        { title: 'Result Return', icon: Zap }
      ],
      featuresTitle: 'Core Features',
      features: [
        {
          title: 'Smart Routing',
          desc: 'Intelligent routing based on request content to the most suitable Agent, optimizing service quality',
          list: ['Load Balancing', 'Failover', 'Latency Optimization']
        },
        {
          title: 'Agent Registration & Discovery',
          desc: 'Standardized Agent registration mechanism with flexible querying and discovery',
          list: ['Real-time Status', 'Capability Index', 'Version Management']
        },
        {
          title: 'A2A Protocol Gateway',
          desc: 'Unified A2A protocol implementation ensuring cross-framework interoperability',
          list: ['Message Transformation', 'Security Authentication', 'Traffic Control']
        },
        {
          title: 'Monitoring & Logging',
          desc: 'Comprehensive monitoring and logging system ensuring service reliability',
          list: ['Request Tracing', 'Performance Metrics', 'Alerting']
        }
      ],
      apiTitle: 'Core API Endpoints'
    },
    welcome: {
      title: 'Welcome to WAU',
      subtitle: 'The Future of AI Agent Network',
      description: 'A distributed network of intelligent Agents, connected through the A2A protocol. Experience seamless collaboration across frameworks.',
      enter: 'Enter WAU'
    },
    footer: {
      tagline: 'Connecting Agents, Connecting Future',
      product: 'Product',
      resources: 'Resources',
      contact: 'Contact',
      productItems: ['WAUS - Agent Singularity', 'WAUC - Agent Center', 'Agent Card', 'A2A Protocol'],
      resourceItems: ['Documentation', 'Developer API', 'Code Examples', 'Community Forum'],
      contactItems: ['Email: contact@wau.ai', 'GitHub: github.com/wau', 'Twitter: @WAU_AI', 'Discord: discord.gg/wau'],
      copyright: '© 2024 WAU. All rights reserved.',
      links: ['Privacy Policy', 'Terms of Service', 'Technical Agreement']
    }
  }
};

// Agent Card 展示组件
const AgentCard = ({ t }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-br from-wau-primary/20 to-wau-secondary/20 rounded-2xl blur-xl" />
    <div className="relative glass-card p-8 rounded-2xl border border-white/10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-wau-primary to-wau-secondary flex items-center justify-center">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h4 className="text-white font-bold text-lg">DataAnalysis Pro</h4>
          <p className="text-gray-400 text-sm">{t.home.agentCard.title}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {['数据分析', 'Data Analysis', '可视化', 'Visualization', '预测建模', 'Predictive Modeling'].slice(0, 4).map((tag, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-wau-primary/20 text-wau-primary text-xs">
              {tag}
            </span>
          ))}
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Response Time</span>
          <span className="text-green-400">&lt; 100ms</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Availability</span>
          <span className="text-green-400">99.9%</span>
        </div>
      </div>
    </div>
  </div>
);

// 欢迎页面组件 - 点击 Try to access WAU 后进入
const WelcomePage = ({ t }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const createNodes = () => {
      const nodes = [];
      const nodeCount = Math.floor((width * height) / 10000);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.5,
          pulse: Math.random() * Math.PI * 2
        });
      }
      return nodes;
    };

    let nodes = createNodes();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 绘制连线
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.1)';
      ctx.lineWidth = 1;

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        nodes.slice(i + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      // 绘制节点
      nodes.forEach(node => {
        const pulseOpacity = 0.5 + Math.sin(node.pulse) * 0.2;

        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 3
        );
        gradient.addColorStop(0, `rgba(20, 184, 166, ${pulseOpacity})`);
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${pulseOpacity + 0.3})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes = createNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 神经网络背景 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 背景光效 */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-wau-primary/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-wau-secondary/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* 主标题 */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
          <span className="text-gradient">{t.welcome.title}</span>
        </h1>

        {/* 副标题 */}
        <h2 className="text-2xl md:text-3xl font-light text-white/70 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {t.welcome.subtitle}
        </h2>

        {/* 描述 */}
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {t.welcome.description}
        </p>
      </div>

      {/* 底部进入按钮 */}
      <div className="relative z-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={() => window.open('https://wauw.xplorelab.online', '_blank')}
          className="group px-12 py-5 bg-gradient-to-r from-wau-primary to-wau-secondary rounded-full text-white font-semibold text-xl hover:opacity-90 transition-all neon-glow hover:scale-105"
        >
          <span className="flex items-center gap-3">
            {t.welcome.enter}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-wau-darker to-transparent" />
    </div>
  );
};

// 导航栏组件
const Navbar = ({ currentPage, setCurrentPage, language, setLanguage, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Globe },
    { id: 'wau', label: t.nav.about, icon: Brain },
    { id: 'waus', label: t.nav.waus, icon: Sparkles },
    { id: 'wauc', label: t.nav.wauc, icon: Network },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-wau-dark/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <span className="text-3xl font-bold text-white tracking-tight">WAU</span>
            <p className="text-sm text-gray-400 tracking-wide mt-1">Whis Agent Universe</p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'bg-wau-primary/20 text-wau-primary border border-wau-primary/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Languages className="w-4 h-4" />
              {language === 'zh' ? 'EN' : '中文'}
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-wau-primary/20 text-wau-primary'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Languages className="w-4 h-4" />
              {language === 'zh' ? 'Switch to English' : '切换到中文'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// 首页组件
const HomePage = ({ setCurrentPage, t }) => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 神经网络背景 */}
      <NeuralNetworkBackground />

      {/* 背景光效 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wau-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-wau-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
          <span className="text-white block leading-tight">{t.home.title}</span>
          <span className="text-gradient block leading-tight mt-4">{t.home.subtitle}</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {t.home.description}
        </p>

        <div className="flex items-center justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => setCurrentPage('welcome')}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-wau-primary to-wau-secondary rounded-xl text-white font-semibold hover:opacity-90 transition-all neon-glow"
          >
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            {t.home.tryWAU}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>

    {/* 核心特性 */}
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.home.sectionTitle}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t.home.sectionDesc}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.home.features.map((feature, index) => (
            <div key={index} className="glass-card p-8 group cursor-pointer animate-slide-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-wau-primary to-wau-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {index === 0 ? <Search className="w-7 h-7 text-white" /> :
                 index === 1 ? <Network className="w-7 h-7 text-white" /> :
                 <Zap className="w-7 h-7 text-white" />}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Agent Card 展示 */}
    <section className="py-24 px-6 bg-gradient-to-b from-transparent to-wau-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              {t.home.agentCard.title}
              <span className="text-gradient">{t.home.agentCard.subtitle}</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">{t.home.agentCard.desc}</p>
            <div className="space-y-4">
              {t.home.agentCard.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-wau-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-wau-primary" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <AgentCard t={t} />
        </div>
      </div>
    </section>

    {/* 模块概览 */}
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.home.modulesTitle}</h2>
          <p className="text-gray-400">{t.home.modulesDesc}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="group relative glass-card p-10 rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setCurrentPage('welcome')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-wau-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wau-primary to-wau-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t.home.wausTitle}</h3>
              <p className="text-gray-400 mb-6">{t.home.wausShort}</p>
              <p className="text-gray-300">{t.home.wausDesc}</p>
            </div>
          </div>

          <div
            className="group relative glass-card p-10 rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => setCurrentPage('wauc')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-wau-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wau-accent to-wau-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{t.home.waucTitle}</h3>
              <p className="text-gray-400 mb-6">{t.home.waucShort}</p>
              <p className="text-gray-300">{t.home.waucDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// 关于 WAU 页面
const AboutWAU = ({ t }) => (
  <div className="min-h-screen pt-24">
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wau-primary/10 border border-wau-primary/20 text-wau-primary text-sm mb-6">
            <Brain className="w-4 h-4" />
            <span>{t.about.badge}</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            {t.about.title}
            <span className="text-gradient">{t.about.subtitle}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">{t.about.desc}</p>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.about.evolutionTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.about.evolution.map((item, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-wau-primary to-wau-secondary opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-wau-primary to-wau-secondary text-white text-xs font-medium mb-4">
                  {item.era}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-wau-primary font-medium mb-3">{item.example}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.about.valuesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.about.values.map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-xl flex items-start gap-4 hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-wau-primary/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-wau-primary" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">{t.about.frameworks}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['LangChain', 'LlamaIndex', 'CrewAI', 'Google ADK', 'AutoGPT', 'LangGraph', 'Semantic Kernel', 'AgentGPT'].map((framework, i) => (
              <div key={i} className="px-6 py-3 glass-card rounded-xl text-gray-300 hover:text-white hover:border-wau-primary/50 transition-all cursor-pointer">
                {framework}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

// WAUS 页面
const WAUSPage = ({ t }) => (
  <div className="min-h-screen pt-24">
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-wau-primary/20 to-wau-secondary/20 border border-wau-primary/30 text-wau-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{t.waus.badge}</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            {t.waus.title}
            <span className="text-gradient">{t.waus.subtitle}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.waus.desc}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            { title: 'Multi-Modal', desc: 'Support for text, image, voice, video and more', icon: '🎨' },
            { title: 'Advanced Reasoning', desc: 'Chain-of-thought, tree-of-thought strategies', icon: '🧠' },
            { title: 'Tool Ecosystem', desc: 'Hundreds of tools for coding, search, analysis', icon: '🛠️' },
            { title: 'Continuous Learning', desc: 'Agents learn from interactions', icon: '📈' },
            { title: 'Collaborative Orchestration', desc: 'Multiple agents work together', icon: '🤝' },
            { title: 'High Performance', desc: 'Optimized engine for ms responses', icon: '⚡' }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl group hover:border-wau-primary/30 transition-all animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.waus.featuredAgents}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.waus.agentList.map((agent, i) => (
              <div key={i} className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-wau-primary to-wau-secondary flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{agent.name}</h4>
                    <p className="text-gray-400 text-sm">{agent.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-green-400 text-sm">{agent.status}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 rounded-md bg-wau-primary/20 text-wau-primary text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-12 rounded-2xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {t.waus.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

// WAUC 页面
const WAUCPage = ({ t }) => (
  <div className="min-h-screen pt-24">
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wau-accent/20 border border-wau-accent/30 text-wau-accent text-sm mb-6">
            <Network className="w-4 h-4" />
            <span>{t.wauc.badge}</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            {t.wauc.title}
            <span className="text-gradient">{t.wauc.subtitle}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t.wauc.desc}</p>
        </div>

        <div className="glass-card p-12 rounded-2xl mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">{t.wauc.archTitle}</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wau-primary to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-wau-primary to-wau-secondary opacity-20 blur-xl" />

            <div className="relative flex items-center justify-center gap-8 flex-wrap">
              {t.wauc.flow.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="glass-card p-6 rounded-xl text-center">
                    <div className="w-14 h-14 rounded-xl bg-wau-primary/20 flex items-center justify-center mx-auto mb-3">
                      <step.icon className="w-7 h-7 text-wau-primary" />
                    </div>
                    <h4 className="text-white font-semibold">{step.title}</h4>
                  </div>
                  {i < t.wauc.flow.length - 1 && (
                    <ArrowRight className="text-wau-primary w-6 h-6" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {t.wauc.features.map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.desc}</p>
              <div className="flex flex-wrap gap-2">
                {feature.list.map((item, j) => (
                  <span key={j} className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6">{t.wauc.apiTitle}</h3>
          <div className="space-y-4">
            {[
              { method: 'POST', path: '/api/v1/agents/discover', desc: 'Discover matching Agents' },
              { method: 'POST', path: '/api/v1/agents/connect', desc: 'Connect to specified Agent' },
              { method: 'GET', path: '/api/v1/agents/:id/card', desc: 'Get Agent Card' },
              { method: 'POST', path: '/api/v1/messages/send', desc: 'Send A2A message' }
            ].map((api, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <span className={`px-3 py-1 rounded text-xs font-mono font-medium ${
                  api.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {api.method}
                </span>
                <code className="text-gray-300 font-mono text-sm flex-1">{api.path}</code>
                <span className="text-gray-400 text-sm">{api.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

// 页脚组件
const Footer = ({ t }) => (
  <footer className="border-t border-white/5 py-12 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wau-primary to-wau-secondary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">WAU</span>
          </div>
          <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.footer.product}</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {t.footer.productItems.map((item, i) => (
              <li key={i} className="hover:text-wau-primary cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.footer.resources}</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {t.footer.resourceItems.map((item, i) => (
              <li key={i} className="hover:text-wau-primary cursor-pointer transition-colors">{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.footer.contact}</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {t.footer.contactItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">{t.footer.copyright}</p>
        <div className="flex items-center gap-6 text-gray-500">
          {t.footer.links.map((link, i) => (
            <span key={i} className="text-sm hover:text-wau-primary cursor-pointer transition-colors">{link}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// 主应用
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage t={t} />;
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} t={t} />;
      case 'wau':
        return <AboutWAU t={t} />;
      case 'waus':
        return <WAUSPage t={t} />;
      case 'wauc':
        return <WAUCPage t={t} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} t={t} />;
    }
  };

  return (
    <div className="bg-wau-darker min-h-screen">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} language={language} setLanguage={setLanguage} t={t} />
      {renderPage()}
      <Footer t={t} />
    </div>
  );
}

export default App;
