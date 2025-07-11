import { Zap, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SchoolManagementHomepage() {
    return (
        <div className="min-h-screen ">
            {/* Header */}
            <header className={`fixed bg-white/10 backdrop-blur-xl shadow-sm w-full z-50 transition-all duration-300 '
                }`}>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <div className="w-10 h-12 bg-muted rounded-xl flex items-center justify-center mr-3">
                                <img src="./logo.png" alt="" className='w-6 h-8' />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-primary bg-clip-text text-transparent">
                                Sschool
                            </span>
                        </div>

                        <Link to={'/login'} >
                            <Button className={'rounded-full py-6'}> Connexion</Button>
                        </Link>

                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="pt-20 h-screen pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid mt-16 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Gestion scolaire de nouvelle génération
                                </div>
                                <h1 className="text-2xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    Transformez votre
                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                                        gestion scolaire
                                    </span>
                                </h1>
                                <p className="text-md text-gray-600 leading-relaxed">
                                    Simplifiez les opérations, améliorez la communication et boostez la performance académique avec notre plateforme complète de gestion scolaire.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-primary py-6   rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold text-lg flex items-center justify-center group">
                                    Votre espace
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button >
                                <Button variant={'outline'} className="border-2 py-5.5 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-semibold text-lg flex items-center justify-center">
                                    <Play className="w-5 h-5 mr-2" />
                                    Voir la démo
                                </Button >
                            </div>
                        </div>

                        <div className="relative">
                            {/* Background Shapes */}
                            <div className="absolute inset-0">
                                <div className="absolute top-8 right-8 w-32 h-32 bg-teal-500 rounded-full opacity-20"></div>
                                <div className="absolute top-20 right-20 w-48 h-48 bg-orange-500 transform rotate-45 opacity-10"></div>
                                <div className="absolute bottom-16 left-8 w-24 h-24 bg-yellow-400 transform rotate-12 opacity-20"></div>
                            </div>

                            {/* Main Hero Image */}
                            <div className="relative z-10 bg-muted rounded-3xl p-8 transform rotate-3  transition-transform duration-300">
                                <img
                                    src="/hero.jpg"
                                    alt="Élève heureux avec des livres"
                                    className="w-full h-96 object-cover rounded-2xl"
                                />
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute bottom-5 -right-1 z-20 bg-white rounded-full p-3 shadow-lg ">
                                <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                            </div>

                            <div className="absolute top-90 left-1/2 -translate-x-1/2  w-fit z-10 border-2 border-primary bg-white rounded-xl p-2 shadow-lg">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="/logo.jpg"
                                        alt="Élève heureux avec des livres"
                                        className="w-10 h-10 object-cover rounded-2xl"
                                    />
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-900">Bzioui Said</div>
                                        <div className="text-gray-500">Développeur</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-10 -left-12 bg-white rounded-xl p-3 shadow-lg">
                                <div className="w-8 h-2 bg-orange-500 rounded-full mb-1"></div>
                                <div className="w-6 h-2 bg-gray-200 rounded-full mb-1"></div>
                                <div className="w-4 h-2 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold">EduManage</span>
                            </div>
                            <p className="text-gray-400">
                                Donner aux écoles des solutions de gestion modernes pour de meilleurs résultats éducatifs.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Produit</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Sécurité</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Mises à jour</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Entreprise</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Référence API</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Statut</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 EduManage. Tous droits réservés.</p>
                    </div>
                </div>
            </footer> */}
        </div>
    );
}
