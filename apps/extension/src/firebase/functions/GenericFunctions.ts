import { db } from 'firebase/firebase-config'
import { collection, getDoc, getDocs, updateDoc } from 'firebase/firestore'

export const getDataFromCollectionRef = async (ColRef: any) => {
  try {
    const querySnapshot = await getDocs(ColRef)
    const resData: any = []
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        data: doc.data()
      }
      resData.push(data)
    })
    return { success: true, data: resData }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getSingleDocFromCollectionRef = async (ColRef: any) => {
  try {
    const querySnapshot = await getDoc(ColRef)
    if (querySnapshot.exists()) {
      return { success: true, data: querySnapshot.data() }
    } else {
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

// function to add or replace setting
export function replaceOrAddSetting(settingsArray: any, newSetting: any) {
  const oldSettings = JSON.parse(settingsArray)
  const existingIndex = oldSettings.findIndex(
    (setting: any) => setting.name === newSetting.name
  )

  if (existingIndex !== -1) {
    oldSettings[existingIndex] = newSetting
  } else {
    oldSettings.push(newSetting)
  }

  return JSON.stringify(oldSettings)
}

export const initialLoadScripts = async () => {
  // script to update settings
  try {
    // get all user is the users collection
    const usersRef: any = collection(db, 'users')
    const usersSnap = await getDocs(usersRef)

    // update all the users with the new settings
    usersSnap.forEach(async (doc: any) => {
      const settings = doc.data().settings
      const newSettings = replaceOrAddSetting(settings, {
        type: 'minimal-home-settings',
        name: 'Minimal Home',
        description: 'Disable if you dont want to minimal home screen',
        isToggled: false
      })
      await updateDoc(doc.ref, {
        settings: newSettings
      })
    })
  } catch (error) {
    console.log(error)
  }
}
