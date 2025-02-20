window.onload = () => {

    // Registrazione di una funzione di espressione personalizzata in Vega
    vega.expressionFunction('doubleValue', (value) => value * 2);

    // Specifica di Vega con l'uso della funzione personalizzata
    const spec = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "width": 400,
        "height": 200,
        "padding": 5,
        "data": [
            {
                "name": "table",
                "values": [
                    {"category": "A", "value": 30},
                    {"category": "B", "value": 80},
                    {"category": "C", "value": 45}
                ],
                "transform": [
                    {
                        "type": "formula",
                        "as": "value",
                        "expr": "doubleValue(datum.value)"
                    }
                ]
            }
        ],
        "scales": [
            {
                "name": "xscale",
                "type": "band",
                "domain": {"data": "table", "field": "category"},
                "range": "width",
                "padding": 0.05
            },
            {
                "name": "yscale",
                "domain": {"data": "table", "field": "value"},
                "nice": true,
                "range": "height"
            }
        ],
        "axes": [
            {"orient": "bottom", "scale": "xscale"},
            {"orient": "left", "scale": "yscale"}
        ],
        "marks": [
            {
                "type": "rect",
                "from": {"data": "table"},
                "encode": {
                    "enter": {
                        "x": {"scale": "xscale", "field": "category"},
                        "width": {"scale": "xscale", "band": 0.5},
                        "y": {"scale": "yscale", "field": "value"},
                        "y2": {"scale": "yscale", "value": 0},
                        "fill": {"value": "steelblue"}
                    }
                }
            }
        ]
    };

    // Render della visualizzazione con Vega Embed
    vegaEmbed('#vis', spec).then(result => {
        console.log("Visualizzazione renderizzata con successo!");
    }).catch(console.error);
};
