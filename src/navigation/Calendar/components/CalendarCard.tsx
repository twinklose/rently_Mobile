import { StyleSheet, Text, View } from 'react-native'

export default function CalendarCard({
  label,
  date,
  comment,
}: Readonly<{
  label: string
  date?: string
  comment: string
}>) {
  const getColor = (label: string) => {
    switch (label) {
      case 'Visite':
        return '#4A43EC'
      case 'Réunion':
        return '#FEBB2E'
      case 'État des lieux':
        return '#FF6C6C'
      default:
        return 'black'
    }
  }

  return (
    <View style={styles.card} className='shadow-md'>
      <View style={styles.cardComponent}>
        <Text
          style={{
            ...styles.label,
            color: getColor(label),
          }}
        >
          {label || 'Rendez-vous'}
        </Text>
        {date && <Text> - </Text>}
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.cardComponent}>
        <Text numberOfLines={1} style={styles.details}>
          {comment || ''}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    minHeight: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 15,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardComponent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
})
