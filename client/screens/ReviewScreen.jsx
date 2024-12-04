import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const WriteReviewPage = () => {
  const [rating, setRating] = useState(8); // Default rating
  const [reviewText, setReviewText] = useState('');

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = () => {
    console.log('Rating:', rating);
    console.log('Review:', reviewText);
    // Add review submission logic here
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <TouchableOpacity style={{ marginBottom: 10 }}>
        <Text style={{ color: 'black', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your movie image URL
          style={{ width: 50, height: 70, marginRight: 10 }}
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Venom: The Last Dance</Text>
      </View>
      <Text style={{ marginBottom: 10, fontSize: 16 }}>Press to leave a rating</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
            <FontAwesome
              name={index < rating ? 'star' : 'star-o'}
              size={25}
              color={index < rating ? '#fdd835' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ marginBottom: 10, fontSize: 16 }}>Your thoughts about the movie</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          height: 100,
          textAlignVertical: 'top',
          marginBottom: 20,
          fontSize: 14,
        }}
        placeholder="Share your thoughts ..."
        placeholderTextColor="#aaa"
        multiline
        value={reviewText}
        onChangeText={setReviewText}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#d32f2f',
          paddingVertical: 15,
          borderRadius: 5,
          alignItems: 'center',
        }}
        onPress={handleSubmitReview}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Send your review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WriteReviewPage;
