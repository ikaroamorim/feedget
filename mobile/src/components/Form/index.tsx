import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'
import React, { useState } from 'react';
import {
   View,
   TextInput,
   Image,
   Text,
   TouchableOpacity
} from 'react-native';
import { theme } from '../../theme';

import * as FileSystem from 'expo-file-system'

import { styles } from './styles';

import { FeedbackType } from '../Widget'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { ScreenshotButton } from '../ScreenshotButton'
import { Button } from '../Button';
import { api } from '../../libs/api';

interface Props {
   feedbackType: FeedbackType;
   onFeedbackCancelled: () => void;
   onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCancelled, onFeedbackSent }: Props) {
   const [screenshot, setScreenshot] = useState<string | null>(null)

   const [ isSendingFeedback, SetIsSendingFeedback] = useState<boolean>(false)

   const [ comment, setComment] = useState("Comentário")

   const feedbackTypeInfo = feedbackTypes[feedbackType]

   function handleScreenshot() {
      captureScreen({
         format: 'png',
         quality: 0.8

      }).then(uri => setScreenshot(uri))
         .catch(err => console.error(err))
   }

   function handleScreenshotRemove() {
      setScreenshot(null)
   }

   async function handleSendFeedback(){
      if(isSendingFeedback){return}

      SetIsSendingFeedback(true)

      const screenshotBase64 = screenshot &&  await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

      try{
         await api.post('/feedbacks', {
            type: feedbackType,
            screenshot: `data:image/png;base64, ${screenshotBase64}`,
            comment,
         })

         onFeedbackSent()

      }catch(err){
         console.error(err)
         SetIsSendingFeedback(false)
      }
      
   }


   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity
               onPress={onFeedbackCancelled}>
               <ArrowLeft
                  size={24}
                  weight="bold"
                  color={theme.colors.text_secondary} />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
               <Image
                  style={styles.image}
                  source={feedbackTypeInfo.image}
               />

               <Text
                  style={styles.titleText}>
                  {feedbackTypeInfo.title}
               </Text>
            </View>
         </View>


         <Text style={{ color: "#ffffff", paddingVertical: 24 }}> Local onde o TextInput estava causando Problemas</Text>


         <View style={styles.footer}>
            <ScreenshotButton
               onTakeShot={handleScreenshot}
               onRemoveShot={handleScreenshotRemove}
               screenshot={screenshot} />
            <Button
               onPress={handleSendFeedback}
               isLoading={isSendingFeedback} />
         </View>
      </View>
   );
}

/*

Text input tha failing
         <TextInput
            multiline
            style={styles.input}
            onChangeText={setComment}
            placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
            placeholderTextColor={theme.colors.text_secondary} />

*/