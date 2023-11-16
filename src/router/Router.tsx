import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from './routes'
import { useAppSelector } from '../store/store'
import { selectedUser } from '../features/userSlice'
import Login from '../navigation/Login/Login'
import Splash from '../navigation/Splash'
import TabNavigator from './TabNavigator'
import AddAppointment from '../navigation/AddAppointment/AddAppointment'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function Router(): JSX.Element {
  const Stack = createNativeStackNavigator()
  const user = useAppSelector(selectedUser)

  console.log('user', user)

  const [isSplash, setIsSplash] = useState<boolean>(true)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  setTimeout(() => {
    setIsSplash(false)
  }, 1500)

  useEffect(() => {
    if (user) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [user])

  if (isSplash) {
    return <Splash />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLogin ? (
            <Stack.Screen
              name={ROUTES.LOGIN}
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <>
              <Stack.Screen
                name={ROUTES.MAIN}
                component={TabNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={ROUTES.ADD_APPOINTMENT}
                component={AddAppointment}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}