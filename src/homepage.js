import './App.css';
import { Link } from 'react-router-dom';
function HomePage() {
    return (
        <body>
            <div class="container">
                <div class="button-container">
                    <Link to="/buy" className="button">GANDU</Link>
                    <Link to="/sell" className="button">Sell</Link>
                    <Link to="/request" className="button">Request</Link>
                    <Link to="/view-request" className="button">View Request</Link>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </body>

    );
}

export default HomePage;