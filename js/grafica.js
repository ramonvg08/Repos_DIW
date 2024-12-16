document.addEventListener('DOMContentLoaded', function () {
    const symbol= "EURUSD"; // Símbolo de la acción predeterminado
    

    // Configura el gráfico de TradingView
    function loadTradingViewWidget(symbol) {
            new TradingView.widget({
                "container_id": "chart",
                "symbol": symbol,
                "interval": "D",
                "timezone": "America/New_York",
                "theme": "dark",
                "style": "1",
                "locale": "es",
                "toolbar_bg": "#f1f3f6",
                "hide_top_toolbar": false,
                "hide_side_toolbar": false,
                "save_image": true,
                "details": false,
                "news": ["headlines"],
                "withdateranges": true,
                "range": "ytd",
                "allow_symbol_change": true,
                "show_popup_button": true,
                "popup_width": "1000",
                "popup_height": "650",
        });        
    }

    // Cargar datos iniciales
    loadTradingViewWidget(symbol);
});
