document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "ct8m13hr01qtkv5slgr0ct8m13hr01qtkv5slgrg"; // Reemplaza esto con tu clave API de Finnhub
    const marketSelector = document.getElementById('marketSelector');
    const symbolSelector = document.getElementById('symbolSelector');
    const currentSymbol = symbolSelector.value; // Toma el símbolo seleccionado inicialmente
    const marketData = {
        stocks: [
            { symbol: "AAPL", name: "Apple" },
            { symbol: "MSFT", name: "Microsoft" },
            { symbol: "GOOGL", name: "Google" }
        ],
        forex: [
            { symbol: "EURUSD", name: "Euro/Dólar" },
            { symbol: "GBPUSD", name: "Libra/Dólar" },
            { symbol: "USDJPY", name: "Dólar/Yen" }
        ],
        crypto: [
            { symbol: "BTCUSD", name: "Bitcoin" },
            { symbol: "ETHUSD", name: "Ethereum" },
            { symbol: "BNBUSD", name: "Binance Coin" }
        ]
    };
    

    // Configura el gráfico de TradingView
    function loadTradingViewWidget(currentSymbol) {
            new TradingView.widget({
                "container_id": "chart",
                "symbol": currentSymbol,
                "interval": "D",
                "timezone": "America/New_York",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "hide_top_toolbar": true,
                "save_image": false,
                "studies": ["MACD", "RSI"],
                "details": true,
                "news": ["headlines"]
        });        
    }


    // Actualizar datos al cambiar el símbolo
    symbolSelector.addEventListener('change', () => {
        selectedSymbol = symbolSelector.value;
        loadTradingViewWidget(selectedSymbol);
    });

    // Cargar datos iniciales
    loadTradingViewWidget(currentSymbol);

    // Para manejar que cambie de activo en la grafica segun el seleccionado
    function updateSymbols(market) {
        // Vaciar el selector de símbolos
        symbolSelector.innerHTML = "";
    
        // Agregar opciones del mercado seleccionado
        marketData[market].forEach(asset => {
            const option = document.createElement('option');
            option.value = asset.symbol;
            option.textContent = `${asset.name} (${asset.symbol})`;
            symbolSelector.appendChild(option);
        });
    
        // Cargar el primer activo del mercado
        const firstSymbol = marketData[market][0]?.symbol;
        if (firstSymbol) {
            loadTradingViewWidget(firstSymbol);
            loadCompanyData(firstSymbol);
        }
    }
    
    // Actualizar símbolos cuando se cambie el mercado
    marketSelector.addEventListener('change', () => {
        const selectedMarket = marketSelector.value;
        updateSymbols(selectedMarket);
    });
    
    // Cargar símbolos iniciales para acciones
    updateSymbols('stocks');
    
    // Cambiar gráfico cuando se seleccione otro activo
    symbolSelector.addEventListener('change', () => {
        const selectedSymbol = symbolSelector.value;
        loadTradingViewWidget(selectedSymbol);
        loadCompanyData(selectedSymbol);
    });
});
