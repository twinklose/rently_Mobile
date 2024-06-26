import { Pressable, Text } from 'react-native'

export default function Button({
  text,
  onPress = async () => {},
  onPressIn = () => {},
  isSubmitting = false,
  isDeconnecting = false,
  disabled = false,
}: Readonly<{
  text: string
  onPress?: () => Promise<void>
  onPressIn?: () => void
  isSubmitting?: boolean
  isDeconnecting?: boolean
  disabled?: boolean
}>): JSX.Element {
  if (isDeconnecting) {
    return (
      <Pressable
        className={`w-full px-[15px] py-[10px] rounded-[10px] justify-center items-center shadow bg-transparent
          `}
        onPress={onPress}
        disabled={isSubmitting || disabled}
        onPressIn={onPressIn}
      >
        <Text className="text-black text-lg font-semibold font-['SF Pro Text']">
          {text}
        </Text>
      </Pressable>
    )
  }

  return (
    <Pressable
      className={`w-full px-[15px] py-[10px] rounded-[10px] justify-center items-center shadow
            ${isSubmitting ? 'bg-indigo-500' : 'bg-indigo-600'}
            ${disabled ? 'bg-indigo-300' : 'bg-indigo-500'}
          `}
      onPress={onPress}
      disabled={isSubmitting || disabled}
      onPressIn={onPressIn}
    >
      <Text className="text-white text-lg font-semibold font-['SF Pro Text']">
        {text}
      </Text>
    </Pressable>
  )
}
