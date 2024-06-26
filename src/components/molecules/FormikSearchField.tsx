import FormikField from '../atoms/FormikField'
import { View, Image } from 'react-native'

export default function FormikSearchField({
  title = 'Rechercher un bien',
  isSearch = false,
}: Readonly<{
  title?: string
  isSearch?: boolean
}>): JSX.Element {
  return (
    <FormikField
      name='search'
      placeholder={title}
      keyboardType='default'
      inputPassword={false}
      isSearch={isSearch}
    >
      <View className='absolute right-5'>
        <Image
          source={require('../../../assets/Search.png')}
          className='w-[22px] h-[22px]'
        />
      </View>
    </FormikField>
  )
}
