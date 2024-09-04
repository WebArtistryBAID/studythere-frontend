import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { getRooms } from '../data/api.ts'
import Loading from '../common/Loading.tsx'
import Error from '../common/Error.tsx'
import { useNavigate } from 'react-router-dom'
import RoomBlock from './RoomBlock.tsx'
import { PersistentStorage, usePersistentStorage } from '../data/persistentStorage.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function PageHome() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const persistentStorage: PersistentStorage = usePersistentStorage()

    const rooms = useQuery({
        queryKey: [ 'rooms' ],
        queryFn: getRooms
    })

    if (rooms.isPending) {
        return <Loading screen={true}/>
    }
    if (rooms.isError || 'detail' in rooms.data) {
        return <Error screen={true} detail={rooms}/>
    }

    return <>
        <div className="py-8 px-8 lg:px-24 xl:px-72 2xl:px-96">
            <h1 className="text-2xl font-bold mb-1">StudyThere for BAID</h1>
            <p className="mb-3">{t('description')}</p>
            <button className="w-64 rounded-full bg-blue-500 hover:bg-blue-600 hover:shadow-lg
                     transition-colors duration-100 p-3 font-display text-white font-bold mb-2"
                    onClick={() => navigate('/login/oauth2/_')}>
                {t('home.contribute')}
            </button>
            {persistentStorage.getToken() != null
                ? <p className="mb-2 flex items-center">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-400 mr-2" />
                    <span>{t('home.contributeSuccess', { name: persistentStorage.decodeToken()!.name })}</span>
                </p>
                : null}

            <p className="text-gray-500 text-sm mb-5">{t('home.contributeDetails')}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {rooms.data.map((room) => <RoomBlock room={room} key={room.id}/>)}
            </div>
        </div>
    </>
}
