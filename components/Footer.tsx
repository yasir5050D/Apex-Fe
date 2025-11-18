export default function Footer() {
    return (
        <footer className="bg-white/80 mt-12 py-8 shadow-inner">
            <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-600">
                © {new Date().getFullYear()} Career Ready J&K — All rights reserved.
            </div>
        </footer>
    )
}