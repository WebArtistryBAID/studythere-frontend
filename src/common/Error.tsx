import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { type UseQueryResult } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Error({
                                  detail,
                                  screen
                              }: { detail: UseQueryResult<any> | null, screen: boolean } = { detail: null, screen: false }) {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div
            className={`${screen ? 'w-screen h-screen' : 'w-full h-full'} flex flex-col justify-center items-center p-5`}>
            <FontAwesomeIcon icon={faCircleExclamation} aria-label={'Error'}
                             className="text-4xl text-red-500 mb-3"/>
            <p className="font-bold font-display text-lg mb-1">{t('error.message')}</p>
            {detail != null
                ? (detail?.data?.detail != null
                    ? <p className="mb-1">{detail.data.detail.toString()}</p>
                    : (detail.error != null
                        ? <p className="mb-1">{detail.error.name}: {detail.error.message}</p>
                        : null))
                : null}

            {screen
                ? <button onClick={() => {
                    navigate('/')
                }} className="rounded-full transition-colors duration-100
                            flex bg-blue-500 text-white mt-3 hover:bg-blue-400 py-3 px-8 justify-center items-center">
                    {t('error.home')}
                </button>
                : null}
        </div>
    )
}
