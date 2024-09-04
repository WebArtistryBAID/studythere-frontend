import { useQuery } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Trans, useTranslation } from 'react-i18next'
import Error from '../common/Error.tsx'
import Loading from '../common/Loading.tsx'
import { getLoginRedirectTarget } from '../data/api.ts'

export default function PageLogin(): JSX.Element {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { redirect } = useParams()

    const target = useQuery({
        queryKey: [ 'loginRedirect' ],
        queryFn: async () => await getLoginRedirectTarget(`${import.meta.env.VITE_HOST}/login/onboarding/${redirect}`)
    })
    if (target.isPending) {
        return <Loading screen={true}/>
    }
    if (target.isError) {
        return <Error screen={true} detail={target}/>
    }
    return (<div className="flex justify-center items-center w-screen h-screen bg-gray-50">
        <div className="p-8 w-full h-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 lg:h-auto bg-white rounded-3xl">
            <div className="flex items-center mb-16">
                <button onClick={() => {
                    navigate('/')
                }} className="rounded-full p-1 hover:bg-gray-200 transition-colors duration-100 w-8 h-8 mr-3"
                        aria-label={t('a11y.back')}>
                    <FontAwesomeIcon icon={faArrowLeft} className="text-gray-800 text-lg"/>
                </button>
                <img src="https://passport.seiue.com/img/seiue.png" alt="Seiue Account" className="h-6 mr-3"/>
                <p className="font-display">{t('login.baid')}</p>
            </div>
            <div id="main">
                <h1 className="font-display text-3xl font-bold mb-1">{t('login.title')}</h1>
                <p className="text-sm mb-5">
                    <Trans i18nKey="login.hint" components={{ 1: <strong/> }}/>
                </p>

                <ul className="list-inside list-disc mb-5">
                    <li>{t('login.permissions.name')}</li>
                    <li>{t('login.permissions.eduId')}</li>
                    <li>{t('login.permissions.schedules')}</li>
                    <li>{t('login.permissions.noPassword')}</li>
                </ul>

                <p className="text-xs text-gray-400 mb-5">{t('login.privacy')}</p>

                <button
                    className="w-full rounded-full bg-blue-500 hover:bg-blue-600 hover:shadow-lg
                     transition-colors duration-100 p-2 font-display text-white mb-8"
                    onClick={() => {
                        location.href = target.data.target
                    }}>
                    {t('login.onboarding.continue')}
                </button>
            </div>
        </div>
    </div>)
}