"use client"

import React, { ChangeEvent, useState, useTransition, useEffect } from "react"
import Link from "next/link";
import { MoonIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid'
import { SunIcon } from '@heroicons/react/20/solid'
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface HeaderProps {

}

const HeaderSection: React.FC<HeaderProps> = ({ }) => {


    const [lenguageHover, setLenguageHover] = useState(false);
    const t = useTranslations('Header');
    const [page, setPage] = useState('')
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const  pathname  = usePathname();

    const onSelectChange = (e: any) => {
        const nextLocale = e.target.value;
        // Consigue el path actual sin el locale
        const currentPath = window.location.pathname.split('/').slice(2).join('/');
        // Cambia el locale en el URL sin cambiar la ruta actual
        window.location.href = `/${nextLocale}/${currentPath}`;
    };
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        if (theme == "dark") {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')

        }
    }, [theme])

    const handleChangeTheme = () => {
        setTheme(prevTheme => prevTheme == "light" ? 'dark' : 'light')
    }
    const isActive = (path:string) => {
        // Verificar si el path actual corresponde a la página de inicio
        if (path === '') {
            // Debe activarse solo si pathname es exactamente '/' o '/locale' (página principal)
            return pathname === `/${locale}` || pathname === '/';
        }
        // Para todas las otras páginas
        return pathname === `/${locale}/${path}`;
    };
    return (
        <div className=" flex justify-between items-center w-full max-w-[120rem] mx-auto px-24 text-black dark:text-whitebg">
            <div>
                Busta Graphic
            </div>
            <div className="space-x-24">
            {['', 'about', 'skills', 'project'].map((path) => (
                    <Link 
                        key={path}
                        href={`/${locale}/${path}`} 
                        locale={locale}
                        className={`tabname  hover:text-primary font-medium dark:text-gray ${isActive(path) ? 'text-primary' : 'text-whitegray'}`}
                    >
                        {t(path || 'home')}
                    </Link>
                ))}
            </div>

            <div className="flex space-x-6 items-center">
                <button onClick={handleChangeTheme} className="rounded-full h-12 w-12 bg-white flex justify-center items-center hover:shadow-lg dark:bg-darkgray group">
                    {theme == 'dark' ? <MoonIcon className="text-primary w-4 h-4" /> : <SunIcon className="text-primary w-5 h-5" />}

                </button>
                <div className="relative inline-block group ">
                    <select defaultValue={locale} onChange={onSelectChange} className="appearance-none outline-none rounded-full px-4 font-semibold w-16 h-12 bg-white flex justify-center items-center hover:shadow-lg dark:bg-darkgray dark:text-whitebg " onMouseEnter={() => setLenguageHover(true)} onMouseLeave={() => setLenguageHover(false)}>
                        <option value="en"> EN</option>
                        <option value="es">ES</option>
                    </select>


                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center  text-whitegray h-12 group-hover:text-whitebg mr-1"
                    >
                        <ChevronDownIcon className="group-hover:text-primary w-6 h-6" />
                    </div>

                </div>

                <button className="bg-primary font-semibold rounded-full h-16 w-56 text-whitebg flex items-center justify-center space-x-3 group hover:shadow-lg dark:text-black 
                ">
                    <div className="group-hover:text-lg">
                        {t('contact')}
                    </div>
                    <ChatBubbleLeftEllipsisIcon className=" w-4 h-4 group-hover:w-5 group-hover:h-5" />

                </button>
            </div>

        </div>
    )
}

export default HeaderSection;
