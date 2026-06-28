const http = require('http');

// محرك ياسمين المركزي - Orchestrator
const YasmineKingdom = {
    activeSessions: ['session_02', 'session_05', 'session_07', 'session_08'],
    status: 'OPTIMIZED',
    init: function() {
        console.log("🚀 المحرك المركزي نشط. تم ربط جميع الأنظمة.");
    }
};
YasmineKingdom.init();

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: YasmineKingdom.status,
        activeSessions: YasmineKingdom.activeSessions
    }));
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server listening on 0.0.0.0:${PORT}`);
});
