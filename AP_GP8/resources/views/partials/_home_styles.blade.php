<style>
    /* Shared Home / Resource page styles (moved from home.blade.php) */
    .home-hero {
        border-radius: 12px;
        padding: 1.5rem;
        color: #fff;
        background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%);
        box-shadow: 0 8px 20px rgba(16,24,40,0.12);
        margin-bottom: 1rem;
    }

    .home-hero h1 { font-size: 1.75rem; font-weight:700; margin-bottom:0.25rem }
    .home-hero p { opacity: 0.95; margin-bottom: 0; }

    .resource-card { border-radius: 10px; transition: transform .15s ease, box-shadow .15s ease; }
    .resource-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(16,24,40,0.12); }

    .tab-pill { border-radius: 999px; padding: .45rem .8rem; color: #fff; margin-right:.5rem; }
    .tab-pill:hover { opacity: .95; text-decoration: none; }
    .tab-programs { background: #6366f1; }
    .tab-facilities { background: #06b6d4; }
    .tab-projects { background: #f59e0b; }
    .tab-services { background: #ef4444; }
    .tab-participants { background: #8b5cf6; }
    .tab-outcomes { background: #10b981; }
</style>