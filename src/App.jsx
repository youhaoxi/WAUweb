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
      waus: '注册Agent',
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
      wausTitle: '注册 Agent',
      wausShort: 'Whis Agent Universe Singularity',
      wausDesc: '注册你的 AI Agent，加入 WAU 生态系统，让更多用户发现并使用你的智能体。',
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
      badge: '注册 Agent',
      title: '注册你的 AI Agent',
      subtitle: '加入 WAU 生态系统',
      desc: '通过 URL 自动发现 A2A Agent Card，快速将你的 Agent 注册到 WAU 网络',
      formTitle: 'Agent Card 注册',
      urlPlaceholder: '输入 Agent URL 地址',
      urlBtn: '获取 Agent Card',
      // A2A 版本
      a2aVersion: 'A2A 版本',
      // 核心身份区
      identityTitle: '核心身份',
      identityDesc: 'Agent 的唯一标识信息',
      agentName: 'Agent 名称',
      agentId: 'Agent ID',
      version: '版本号',
      verified: '已验证',
      // 能力画像区
      capabilitiesTitle: '能力与技能',
      capabilitiesDesc: '定义 Agent 的核心能力和专长领域',
      descriptionLabel: '描述',
      descriptionPlaceholder: '描述你的 Agent 能做什么，有哪些独特能力...',
      descriptionHint: '这段话会被转换成向量存入数据库，用于搜索匹配',
      tagsLabel: '标签',
      tagsPlaceholder: '输入标签，用逗号分隔',
      tagsHint: '添加标签有助于用户发现你的 Agent',
      addTag: '添加标签',
      // A2A 特有字段
      capabilitiesLabel: 'Agent 能力',
      inputModesLabel: '输入模式',
      outputModesLabel: '输出模式',
      skillsTitle: '技能列表',
      skillsLabel: '技能',
      skillsDesc: '定义 Agent 的具体技能和能力',
      skillName: '技能名称',
      skillDesc: '技能描述',
      skillExamples: '使用示例',
      // 认证与隐私
      authTitle: '认证与隐私',
      authDesc: '配置 Agent 的安全设置',
      authType: '认证类型',
      authDescription: '认证说明',
      dataRetention: '数据保留',
      logPolicy: '日志策略',
      // 元数据
      metadataTitle: '元数据',
      metadataDesc: 'Agent 的附加信息',
      author: '作者',
      website: '官网',
      documentation: '文档链接',
      updated: '更新时间',
      // 商业契约区
      businessTitle: '商业设置',
      businessDesc: '配置 Agent 的服务条款（可选）',
      priceLabel: '调用单价',
      priceUnit: 'Token',
      priceHint: '价格越低，初始信任分越高',
      slaLabel: '可用性承诺 (SLA)',
      slaHint: 'SLA 越高，初始信任分越高',
      slaPercent: '%',
      // 技术连接区
      technicalTitle: '技术连接',
      technicalDesc: '确认 Agent 的交互地址',
      endpointLabel: '交互地址',
      urlLabel: 'Agent URL',
      // 按钮
      submitBtn: '确认注册',
      registering: '注册中...',
      cancelBtn: '取消',
      // 状态
      successTitle: '注册成功！',
      successDesc: '你的 Agent 已成功注册到 WAU 网络，正在进行红队测试...',
      taskId: '任务 ID',
      status: '状态',
      pending: '等待处理',
      processing: '处理中',
      completed: '已完成',
      failed: '失败',
      viewAgent: '查看 Agent',
      back: '返回',
      errorDiscovery: '无法发现 Agent Card，请检查 URL 是否正确',
      errorRegister: '注册失败，请稍后重试',
      formTitleDetails: 'Agent 详细信息',
      required: '必填'
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
      waus: 'Register Agent',
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
      wausTitle: 'Register Agent',
      wausShort: 'Whis Agent Universe Singularity',
      wausDesc: 'Register your AI Agent and join the WAU ecosystem, allowing more users to discover and use your intelligent Agent.',
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
      badge: 'Register Agent',
      title: 'Register Your AI Agent',
      subtitle: 'Join the WAU Ecosystem',
      desc: 'Auto-discover A2A Agent Card via URL to quickly register your Agent on the WAU network',
      formTitle: 'Agent Card Registration',
      urlPlaceholder: 'Enter Agent URL',
      urlBtn: 'Get Agent Card',
      // A2A Version
      a2aVersion: 'A2A Version',
      // Core Identity
      identityTitle: 'Core Identity',
      identityDesc: 'Unique identification information for the Agent',
      agentName: 'Agent Name',
      agentId: 'Agent ID',
      version: 'Version',
      verified: 'Verified',
      // Capabilities
      capabilitiesTitle: 'Capabilities & Skills',
      capabilitiesDesc: 'Define your Agent\'s core capabilities and specialties',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Describe what your Agent does and its unique capabilities...',
      descriptionHint: 'This text will be converted to vectors and stored in the database for search matching',
      tagsLabel: 'Tags',
      tagsPlaceholder: 'Enter tags, separated by commas',
      tagsHint: 'Adding tags helps users discover your Agent',
      addTag: 'Add Tag',
      // A2A Specific Fields
      capabilitiesLabel: 'Agent Capabilities',
      inputModesLabel: 'Input Modes',
      outputModesLabel: 'Output Modes',
      skillsTitle: 'Skills List',
      skillsLabel: 'Skills',
      skillsDesc: 'Define specific skills and capabilities of the Agent',
      skillName: 'Skill Name',
      skillDesc: 'Skill Description',
      skillExamples: 'Examples',
      // Authentication & Privacy
      authTitle: 'Authentication & Privacy',
      authDesc: 'Configure Agent security settings',
      authType: 'Authentication Type',
      authDescription: 'Authentication Description',
      dataRetention: 'Data Retention',
      logPolicy: 'Log Policy',
      // Metadata
      metadataTitle: 'Metadata',
      metadataDesc: 'Additional information about the Agent',
      author: 'Author',
      website: 'Website',
      documentation: 'Documentation',
      updated: 'Last Updated',
      // Business & SLA
      businessTitle: 'Business Settings',
      businessDesc: 'Configure Agent service terms (optional)',
      priceLabel: 'Price per Call',
      priceUnit: 'Token',
      priceHint: 'Lower price = higher initial Trust Score',
      slaLabel: 'SLA (Uptime)',
      slaHint: 'Higher SLA = higher initial Trust Score',
      slaPercent: '%',
      // Technical
      technicalTitle: 'Technical Connection',
      technicalDesc: 'Confirm the Agent\'s interaction endpoint',
      endpointLabel: 'Endpoint',
      urlLabel: 'Agent URL',
      // Buttons
      submitBtn: 'Confirm Registration',
      registering: 'Registering...',
      cancelBtn: 'Cancel',
      // Status
      successTitle: 'Registration Successful!',
      successDesc: 'Your Agent has been registered on the WAU network, red team testing in progress...',
      taskId: 'Task ID',
      status: 'Status',
      pending: 'Pending',
      processing: 'Processing',
      completed: 'Completed',
      failed: 'Failed',
      viewAgent: 'View Agent',
      back: 'Back',
      errorDiscovery: 'Unable to discover Agent Card, please check if the URL is correct',
      errorRegister: 'Registration failed, please try again later',
      formTitleDetails: 'Agent Details',
      required: 'Required'
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

// WAUS 页面 - 注册 Agent
// A2A Agent Card 注册控制台页面
const WAUSPage = ({ t }) => {
  const [step, setStep] = useState('discovery'); // discovery, confirm, processing
  const [loading, setLoading] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');
  const [error, setError] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    a2aVersion: '1.0.0',
    id: '',
    name: '',
    description: '',
    version: '',
    url: '',
    capabilities: [],
    defaultInputModes: [],
    defaultOutputModes: [],
    skills: [],
    authentication: { type: '', description: '' },
    privacy: { dataRetention: '', logPolicy: '' },
    metadata: { author: '', website: '', documentation: '', updated: '' },
    tags: [],
    price: 0,
    currency: 'USD',
    sla: 0.99,
    domain: 'General'
  });

  // 定义后端地址
  const API_BASE = 'http://192.168.110.70:9090/api/v1';

  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });
    setLogs(prev => [...prev, { time, msg, type }]);
  };

  const handleDiscovery = async () => {
    if (!targetUrl) {
      setError(t.waus.errorDiscovery);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/discover`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl })
      });

      if (!res.ok) throw new Error(t.waus.errorDiscovery);

      const data = await res.json();
      console.log('A2A Agent Card:', data);

      setAgentData(data);
      setFormData({
        a2aVersion: data.a2aVersion || '1.0.0',
        id: data.id || data.agent_id || '',
        name: data.name || '',
        description: data.description || '',
        version: data.version || '',
        url: data.url || targetUrl,
        capabilities: data.capabilities || [],
        defaultInputModes: data.defaultInputModes || [],
        defaultOutputModes: data.defaultOutputModes || [],
        skills: data.skills || [],
        authentication: data.authentication || { type: '', description: '' },
        privacy: data.privacy || { dataRetention: '', logPolicy: '' },
        metadata: data.metadata || { author: '', website: '', documentation: '', updated: '' },
        tags: data.tags || [],
        price: data.price || 0,
        currency: data.currency || 'USD',
        sla: data.sla || 0.99,
        domain: data.domain || 'General'
      });
      setStep('confirm');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 生成首字母头像
  const getInitials = (name) => {
    return name
      ? name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
      : 'AG';
  };

  // 轮询任务状态
  const pollStatus = async (tid) => {
    try {
      const response = await fetch(`${API_BASE}/status/${tid}`);

      if (!response.ok) throw new Error('Failed to check status');

      const data = await response.json();
      setTaskStatus(data);

      if (data.status === 'success') {
        setSuccess(true);
        setIsRegistering(false);
        addLog(`Registration successful! Trust Score: ${data.trust_score}`, 'success');
      } else if (data.status === 'failed' || data.status === 'error') {
        setError(data.error || t.waus.errorRegister);
        setIsRegistering(false);
        addLog(`Registration failed: ${data.error}`, 'error');
      } else {
        if (data.progress) {
          addLog(`Processing: ${data.progress}...`, 'info');
        }
        setTimeout(() => pollStatus(tid), 1500);
      }
    } catch (err) {
      console.error('Polling error:', err);
      setTimeout(() => pollStatus(tid), 3000);
    }
  };

  // 提交注册
  const handleRegister = async () => {
    if (!formData.name || !formData.description) {
      setError(t.waus.required);
      return;
    }

    setIsRegistering(true);
    setStep('processing');
    setError(null);
    setSuccess(null);
    setLogs([]);
    addLog(`Starting registration for: ${formData.name}`);

    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          a2aVersion: formData.a2aVersion,
          id: formData.id,
          name: formData.name,
          description: formData.description,
          version: formData.version,
          url: formData.url,
          capabilities: formData.capabilities,
          defaultInputModes: formData.defaultInputModes,
          defaultOutputModes: formData.defaultOutputModes,
          skills: formData.skills,
          authentication: formData.authentication,
          privacy: formData.privacy,
          metadata: formData.metadata,
          tags: formData.tags,
          price: parseFloat(formData.price) || 0,
          currency: formData.currency,
          sla: parseFloat(formData.sla) || 0.99,
          domain: formData.domain
        })
      });

      // 处理 409 重复注册
      if (response.status === 409) {
        addLog('Agent already registered in the universe', 'warn');
        setError('Duplicate Registration: This agent already exists.');
        setIsRegistering(false);
        return;
      }

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || t.waus.errorRegister);
      }

      const data = await response.json();
      const newTaskId = data.task_id;
      setTaskId(newTaskId);

      addLog(`Task created. ID: ${newTaskId}`);
      addLog('Added to security audit queue...');
      pollStatus(newTaskId);

    } catch (err) {
      setError(err.message);
      setIsRegistering(false);
      addLog(`Error: ${err.message}`, 'error');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  return (
    <div className="pt-24 pb-12 px-4 container mx-auto max-w-6xl relative z-10 min-h-screen">

      {/* 头部标题 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-wau-primary/20 to-wau-secondary/20 mb-6 border border-wau-primary/30 backdrop-blur-sm">
          <Zap className="w-8 h-8 text-wau-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-wau-primary to-wau-secondary">
          {t.waus.title}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t.waus.desc}
        </p>
      </div>

      {/* 步骤 1: 发现 (Discovery) */}
      {step === 'discovery' && (
        <div className="max-w-xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">
                {t.waus.urlLabel}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-500 group-focus-within:text-wau-primary transition-colors" />
                </div>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://api.example.com/a2a/agent-card"
                  className="block w-full pl-12 pr-12 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-wau-primary/50 focus:border-wau-primary/50 transition-all outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleDiscovery()}
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button
                    onClick={handleDiscovery}
                    disabled={loading}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <p className="mt-3 text-red-400 text-sm flex items-center gap-2">
                  <X className="w-4 h-4" /> {error}
                </p>
              )}
            </div>

            <button
              onClick={handleDiscovery}
              disabled={loading || !targetUrl}
              className="w-full py-4 bg-gradient-to-r from-wau-primary to-wau-secondary rounded-xl text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-wau-primary/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {t.waus.urlBtn}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 步骤 2: 确认 (Confirm) - A2A Agent Card 完整信息 */}
      {step === 'confirm' && agentData && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* 头部 - 核心身份区 */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wau-primary to-wau-secondary flex items-center justify-center text-2xl font-bold text-white shadow-inner">
                    {getInitials(formData.name)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      {formData.name}
                      <span className="px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                        A2A {t.waus.verified}
                      </span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm mt-1">
                      {formData.a2aVersion && `v${formData.a2aVersion}`}
                      {formData.version && ` | ${t.waus.version}: ${formData.version}`}
                    </p>
                  </div>
                </div>
                <button onClick={() => setStep('discovery')} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* 两栏布局 */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* 左侧 - 能力与描述 */}
                <div className="space-y-6">
                  {/* 描述 */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      {t.waus.descriptionLabel} <span className="text-wau-primary">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={5}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-wau-primary/50 outline-none transition-colors resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">{t.waus.descriptionHint}</p>
                  </div>

                  {/* 标签 */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      {t.waus.tagsLabel}
                    </label>
                    <div className="flex flex-wrap gap-2 p-3 bg-black/30 border border-white/10 rounded-lg min-h-[44px]">
                      {formData.tags && formData.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-wau-primary/20 text-wau-primary rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 输入输出模式 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        {t.waus.inputModesLabel}
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {formData.defaultInputModes?.map((mode, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                            {mode}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        {t.waus.outputModesLabel}
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {formData.defaultOutputModes?.map((mode, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                            {mode}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 技能列表 */}
                  {formData.skills && formData.skills.length > 0 && (
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        {t.waus.skillsTitle}
                      </label>
                      <div className="space-y-3">
                        {formData.skills.map((skill, i) => (
                          <div key={i} className="p-3 bg-black/30 border border-white/10 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium">{skill.name}</span>
                            </div>
                            <p className="text-gray-400 text-xs mb-2">{skill.description}</p>
                            {skill.tags && skill.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {skill.tags.map((tag, j) => (
                                  <span key={j} className="px-2 py-0.5 bg-wau-primary/10 text-wau-primary rounded text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 右侧 - 认证、隐私、元数据 */}
                <div className="space-y-6">
                  {/* URL 显示 */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      {t.waus.endpointLabel}
                    </label>
                    <div className="text-sm text-gray-400 font-mono break-all bg-black/50 p-3 rounded border border-white/5">
                      {formData.url}
                    </div>
                  </div>

                  {/* 认证信息 */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      {t.waus.authType}
                    </label>
                    <div className="p-3 bg-black/30 border border-white/10 rounded-lg">
                      <span className="text-white">{formData.authentication?.type || 'N/A'}</span>
                      {formData.authentication?.description && (
                        <p className="text-gray-500 text-xs mt-1">{formData.authentication.description}</p>
                      )}
                    </div>
                  </div>

                  {/* 隐私设置 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        {t.waus.dataRetention}
                      </label>
                      <div className="p-2 bg-black/30 border border-white/10 rounded text-sm text-gray-300">
                        {formData.privacy?.dataRetention || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        {t.waus.logPolicy}
                      </label>
                      <div className="p-2 bg-black/30 border border-white/10 rounded text-sm text-gray-300">
                        {formData.privacy?.logPolicy || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* 元数据 */}
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      {t.waus.metadataTitle}
                    </label>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {formData.metadata?.author && (
                        <div className="p-2 bg-black/30 border border-white/10 rounded">
                          <span className="text-gray-500 text-xs block">{t.waus.author}</span>
                          <span className="text-gray-300">{formData.metadata.author}</span>
                        </div>
                      )}
                      {formData.metadata?.website && (
                        <div className="p-2 bg-black/30 border border-white/10 rounded">
                          <span className="text-gray-500 text-xs block">{t.waus.website}</span>
                          <a href={formData.metadata.website} target="_blank" rel="noreferrer" className="text-wau-primary hover:underline">
                            {formData.metadata.website}
                          </a>
                        </div>
                      )}
                      {formData.metadata?.documentation && (
                        <div className="p-2 bg-black/30 border border-white/10 rounded col-span-2">
                          <span className="text-gray-500 text-xs block">{t.waus.documentation}</span>
                          <a href={formData.metadata.documentation} target="_blank" rel="noreferrer" className="text-wau-primary hover:underline break-all">
                            {formData.metadata.documentation}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 商业设置 */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        {t.waus.priceLabel}
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        step="0.001"
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-wau-primary/50 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-wau-primary/50 outline-none"
                      >
                        <option value="USD">USD</option>
                        <option value="Token">Token</option>
                        <option value="Free">Free</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        Domain
                      </label>
                      <input
                        type="text"
                        value={formData.domain}
                        onChange={(e) => handleInputChange('domain', e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-wau-primary/50 outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                        {t.waus.slaLabel}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        max="1"
                        value={formData.sla}
                        onChange={(e) => handleInputChange('sla', e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-wau-primary/50 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部按钮 */}
              <div className="flex gap-4 pt-6 border-t border-white/5">
                <button
                  onClick={() => setStep('discovery')}
                  className="px-6 py-4 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-colors font-medium"
                >
                  {t.waus.cancelBtn}
                </button>
                <button
                  onClick={handleRegister}
                  disabled={isRegistering}
                  className="flex-1 py-4 bg-gradient-to-r from-wau-primary to-wau-secondary rounded-xl text-white font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-wau-primary/20"
                >
                  {isRegistering ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.waus.registering}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      {t.waus.submitBtn}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 步骤 3: 处理中 (Terminal) */}
      {step === 'processing' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-black rounded-xl border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm h-[500px] flex flex-col">
            <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="ml-2 text-gray-500 text-xs">root@wau:~/tasks/{taskId?.slice(0, 8)}</span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-2">
              {logs.map((log, i) => (
                <div key={i} className={`${
                  log.type === 'error' ? 'text-red-400' :
                  log.type === 'success' ? 'text-green-400' :
                  log.type === 'warn' ? 'text-yellow-400' :
                  'text-gray-300'
                }`}>
                  <span className="opacity-40 mr-2">[{log.time}]</span>
                  {log.msg}
                </div>
              ))}
              {isRegistering && (
                <div className="text-wau-primary animate-pulse mt-2">_</div>
              )}
            </div>

            {/* 成功状态 */}
            {success && (
              <div className="p-6 border-t border-gray-800 bg-green-900/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-green-400 font-bold text-lg mb-1">{t.waus.successTitle}</h3>
                    <p className="text-green-300/60 text-xs">{t.waus.successDesc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setStep('discovery');
                      setTargetUrl('');
                      setAgentData(null);
                      setLogs([]);
                    }}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded border border-gray-700 transition-colors"
                  >
                    {t.waus.viewAgent}
                  </button>
                </div>
              </div>
            )}

            {/* 错误状态 */}
            {error && !isRegistering && (
              <div className="p-6 border-t border-gray-800 bg-red-900/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-red-400 font-bold text-lg mb-1">Process Failed</h3>
                    <p className="text-red-300/60 text-xs">{error}</p>
                  </div>
                  <button
                    onClick={() => setStep('confirm')}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded border border-gray-700 transition-colors"
                  >
                    {t.waus.back}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

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
