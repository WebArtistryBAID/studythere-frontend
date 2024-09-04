import { RoomSchema } from '../data/dataTypes.ts'
import { useQuery } from '@tanstack/react-query'
import { getCurrentActivity } from '../data/api.ts'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCircleCheck, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function RoomBlock({ room }: { room: RoomSchema }) {
    const { t } = useTranslation()

    const roomData = useQuery({
        queryKey: [ `room-${room.id}` ],
        queryFn: async () => await getCurrentActivity(room.id),
        refetchInterval: 120000
    })
    if (roomData.isPending) {
        return <div className="bg-gray-50 rounded-3xl px-8 py-5">
            <div className="bg-gray-100 rounded-3xl w-32 h-8 mb-3"></div>
            <div className="bg-gray-100 rounded-3xl w-72 h-8"></div>
        </div>
    }
    if (roomData.isError || (typeof roomData.data === 'object' && 'detail' in roomData.data)) {
        return <div className="bg-gray-50 rounded-3xl px-8 py-5">
            <p className="text-xl mb-1 font-bold">{room.id}</p>
            <p className="text-sm">{t('home.roomError')}</p>
        </div>
    }

    if (typeof roomData.data === 'string') {
        // None for available
        return <div className="bg-lime-50 rounded-3xl px-8 py-5">
            <p className="text-xl mb-1 font-bold">{room.id}</p>
            <p className="flex items-center text-sm">
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-400 mr-2"/>
                <span>{t('home.room.available')}</span>
            </p>
        </div>
    }

    return <div className="bg-gray-50 rounded-3xl px-8 py-5">
        <p className="text-xl mb-1 font-bold">{room.id}</p>
        <p className="mb-1 flex items-center text-sm">
            <FontAwesomeIcon icon={faCalendar} className="text-black mr-2"/>
            <span>{t('home.room.scheduled', { activity: roomData.data.name })}</span>
        </p>
        <p className="flex items-center text-sm">
            <FontAwesomeIcon icon={faThumbsUp} className="text-black mr-2"/>
            <span>{t('home.room.contributor', { name: roomData.data.contributor.name })}</span>
        </p>
    </div>
}
