import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <header className="fixed w-full z-20 top-0 left-0">
            <div className="backdrop-blur bg-white/70 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center text-white font-bold">CR</div>
                        <div className="text-lg font-semibold">Career Ready J&amp;K</div>
                    </Link>


                    <nav>
                        <Link to="/register" className="ml-6 text-sm font-medium text-blue-600 hover:underline">Register</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}