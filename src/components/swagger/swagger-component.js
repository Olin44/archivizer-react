import React, {Component} from 'react';
import SwaggerUi, {presets} from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

class SwaggerUI extends Component {
    componentDidMount() {
        SwaggerUi({
            dom_id: '#swaggerContainer',
            url: `http://localhost:8080/v2/api-docs`,
            enableCORS: true,
            presets: [presets.apis],
        });
    }

    render() {
        return (
            <div id="swaggerContainer" />
        );
    }
}

export default SwaggerUI;