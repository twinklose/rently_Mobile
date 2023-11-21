import { SafeAreaView, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FormikSearchField from '../../../components/molecules/FormikSearchField'
import ConversationCard from '../../../components/organisms/ConversationCard'

export default function ChatListManagement({
  usersList = [],
  navigateToChat,
}: {
  usersList: {
    id: number
    name: string
    lastMessage: string
    time: string
    image: string
  }[]
  navigateToChat?: (id: number) => Promise<void>
}): JSX.Element {
  return (
    <SafeAreaView className='w-full items-center'>
      <View className='w-full items-center mt-2'>
        <FormikSearchField title='Rechercher une conversation' />
        <ScrollView className='w-11/12'>
          {usersList.map((user) => (
            <ConversationCard
              key={user.id}
              name={user.name}
              time={user.time}
              lastMessage={user.lastMessage}
              onPress={async () => await navigateToChat?.(user.id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}