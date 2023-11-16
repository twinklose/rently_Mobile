import { useEffect, useState, useMemo, useCallback } from 'react'
import { View } from 'react-native'
import axios from 'axios'
import { ROUTE_API } from '../../../constants/api'
import { useAppSelector } from '../../../store/store'
import { selectedUser } from '../../../features/userSlice'
import BulletPointCard from '../../../components/organisms/BulletPointCard'
import PropertyCarousel from '../../../components/organisms/PropertyCarousel'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../../../store/store'
import { setSelectedProperty } from '../../../features/propertySlice'

export default function HomeManagement(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const user = useAppSelector(selectedUser)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [property, setProperty] = useState<any>(null)
  const [propertyStatus, setPropertyStatus] = useState<any>(null)
  const [propertyImages, setPropertyImages] = useState<
    { id: number; name: string; url: string[] }[] | null
  >(null)

  //${user.user_id}

  const getProperty = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(
        `${ROUTE_API.PROPERTY_FILTERS}agent_id=84`,
      )
      setProperty(data)
      setIsLoading(false)
      return data
    } catch (error) {
      setProperty(null)
      setIsLoading(false)
      return "Cet agent n'existe pas"
    }
  }

  const getPropertyStatus = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(ROUTE_API.PROPERTY_STATUS)
      setPropertyStatus(data)
      setIsLoading(false)
      return data
    } catch (error) {
      setPropertyStatus(null)
      setIsLoading(false)
      return "Aucun type de bien n'a été trouvé"
    }
  }

  useEffect(() => {
    getProperty()
    getPropertyStatus()
  }, [])

  const navigateToProperty = useCallback(
    async (propertyId: number) => {
      const selectedProperty = property?.find(
        (property: any) => property.property_id === propertyId,
      )
      await dispatch(
        setSelectedProperty({ selectedProperty: selectedProperty }),
      )
      navigation.navigate('Property' as never)
    },
    [property],
  )

  const fetchPropertyImages = useMemo(() => {
    property?.map(async (property: any) => {
      try {
        const { data } = await axios.get(
          `${ROUTE_API.IMAGES}${property.property_id}`,
        )

        if (!propertyImages) setPropertyImages([])

        setPropertyImages((prevState) => [
          ...prevState!,
          {
            id: property.property_id,
            name: property.name,
            url: data,
          },
        ])
      } catch (error) {
        return "Aucune image n'a été trouvée"
      }
    })
  }, [property])

  useEffect(() => {
    fetchPropertyImages
  }, [property])

  const propertyStatusToSell = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'A vendre',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusToRent = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'A louer',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusInSaling = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) =>
              propertyStatus.name === 'En cours de vente',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyStatusProspectIncoming = useMemo(
    () =>
      propertyStatus
        ? propertyStatus?.filter(
            (propertyStatus: any) => propertyStatus.name === 'Prospect entrant',
          )[0]?.status_id
        : 0,
    [propertyStatus],
  )

  const propertyToSell = useMemo(
    () =>
      property
        ? property?.reduce(
            (acc: any, property: any) =>
              property.status_id === propertyStatusToSell ? acc + 1 : acc + 0,
            0,
          )
        : 0,
    [property, propertyStatusToSell],
  )

  const propertyToRent = useMemo(
    () =>
      property
        ? property?.reduce(
            (acc: any, property: any) =>
              property.status_id === propertyStatusToRent ? acc + 1 : acc + 0,
            0,
          )
        : 0,
    [property, propertyStatusToRent],
  )

  const propetyInSaling = useMemo(
    () =>
      property
        ? property?.reduce(
            (acc: any, property: any) =>
              property.status_id === propertyStatusInSaling ? acc + 1 : acc + 0,
            0,
          )
        : 0,
    [property, propertyStatusInSaling],
  )

  const prospectIncoming = useMemo(
    () =>
      property
        ? property?.reduce(
            (acc: any, property: any) =>
              property.status_id === propertyStatusProspectIncoming
                ? acc + 1
                : acc + 0,
            0,
          )
        : 0,
    [property, propertyStatusProspectIncoming],
  )

  return (
    <View className='items-center'>
      <View className='w-full h-full mt-2 items-center'>
        <View className='w-11/12 h-full flex-row justify-between flex-wrap'>
          <BulletPointCard
            color='red-600'
            text='Propriété à vendre'
            numberOf={propertyToSell}
            isLoading={isLoading}
          />
          <BulletPointCard
            color='green-700'
            text='Propriété à louer'
            numberOf={propertyToRent}
            isLoading={isLoading}
          />
          <BulletPointCard
            color='blue-700'
            text='Prospects en cours'
            numberOf={prospectIncoming}
            isLoading={isLoading}
          />
          <BulletPointCard
            color='yellow-400'
            text='Ventes en cours'
            numberOf={propetyInSaling}
            isLoading={isLoading}
          />
          <View className='w-full h-1/3 items-center justify-center'>
            <PropertyCarousel
              propertyData={propertyImages}
              onPress={navigateToProperty}
            />
          </View>
        </View>
      </View>
    </View>
  )
}