
import { supabase } from '@/integrations/supabase/client';

export const insertSampleBusinesses = async () => {
  try {
    // Use a dummy user_id for sample data
    const dummyUserId = '00000000-0000-0000-0000-000000000000';
    
    // Sample gym data
    const sampleGyms = [
      {
        user_id: dummyUserId,
        business_name: 'PowerFit Gym',
        business_type: 'gym',
        category: 'Premium',
        email: 'contact@powerfit.com',
        phone: '+91 9876543210',
        address: '123 Fitness Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pin_code: '400001',
        opening_time: '06:00',
        closing_time: '22:00',
        monthly_price: 2500,
        session_price: 200,
        description: 'Premium fitness center with modern equipment and expert trainers.',
        amenities: ['Modern Equipment', 'Personal Training', 'Cardio Zone', 'Steam Room'],
        image_urls: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
        status: 'approved'
      },
      {
        user_id: dummyUserId,
        business_name: 'Elite Fitness Center',
        business_type: 'gym', 
        category: 'Premium',
        email: 'info@elitefit.com',
        phone: '+91 9876543211',
        address: '456 Strength Avenue',
        city: 'Delhi',
        state: 'Delhi',
        pin_code: '110001',
        opening_time: '05:30',
        closing_time: '23:00',
        monthly_price: 3000,
        session_price: 250,
        description: 'Elite fitness facility with swimming pool and nutrition counseling.',
        amenities: ['Swimming Pool', 'Yoga Classes', 'Nutrition Counseling', 'Sauna'],
        image_urls: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
        status: 'approved'
      }
    ];

    // Sample spa data
    const sampleSpas = [
      {
        user_id: dummyUserId,
        business_name: 'Serenity Spa & Wellness',
        business_type: 'spa',
        category: 'Luxury',
        email: 'contact@serenityspa.com',
        phone: '+91 9876543212',
        address: '789 Wellness Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pin_code: '560001',
        opening_time: '09:00',
        closing_time: '21:00',
        session_price: 1500,
        description: 'Luxury spa offering rejuvenating treatments and holistic wellness.',
        amenities: ['Aromatherapy', 'Hot Stone Massage', 'Facial Treatments', 'Meditation Room'],
        image_urls: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
        status: 'approved'
      }
    ];

    // Sample yoga data
    const sampleYoga = [
      {
        user_id: dummyUserId,
        business_name: 'Peaceful Mind Yoga',
        business_type: 'yoga',
        category: 'Traditional',
        email: 'info@peacefulmind.com',
        phone: '+91 9876543213',
        address: '321 Peace Lane',
        city: 'Pune',
        state: 'Maharashtra',
        pin_code: '411001',
        opening_time: '06:00',
        closing_time: '20:00',
        session_price: 800,
        description: 'Traditional yoga studio focusing on authentic practices and meditation.',
        amenities: ['Hatha Yoga', 'Meditation', 'Pranayama', 'Philosophy Classes'],
        image_urls: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
        status: 'approved'
      }
    ];

    console.log('Inserting sample business data...');

    const allBusinesses = [...sampleGyms, ...sampleSpas, ...sampleYoga];
    
    for (const business of allBusinesses) {
      const { error } = await supabase
        .from('business_profiles')
        .insert(business);
      
      if (error) {
        console.error('Error inserting business:', error);
      } else {
        console.log(`Successfully inserted: ${business.business_name}`);
      }
    }

    return { success: true, message: 'Sample businesses inserted successfully' };
  } catch (error) {
    console.error('Error inserting sample data:', error);
    return { success: false, message: 'Failed to insert sample data' };
  }
};

export const insertSampleTrainers = async () => {
  try {
    // Use a dummy user_id for sample data
    const dummyUserId = '00000000-0000-0000-0000-000000000000';
    
    const sampleTrainers = [
      {
        user_id: dummyUserId,
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '+91 9876543210',
        category: 'gym',
        trainer_tier: 'Premium',
        experience: 8,
        certifications: 'ACSM Certified Personal Trainer',
        specializations: ['Weight Training', 'Bodybuilding', 'HIIT'],
        hourly_rate: 1500,
        location: 'Mumbai',
        bio: 'Experienced personal trainer with 8 years in bodybuilding and strength training.',
        profile_image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        status: 'approved'
      },
      {
        user_id: dummyUserId,
        name: 'Priya Patel',
        email: 'priya@example.com',
        phone: '+91 9876543211',
        category: 'yoga',
        trainer_tier: 'Expert',
        experience: 6,
        certifications: 'RYT 500 Yoga Teacher',
        specializations: ['Hatha Yoga', 'Meditation', 'Prenatal Yoga'],
        hourly_rate: 1200,
        location: 'Pune',
        bio: 'Certified yoga instructor specializing in traditional practices.',
        profile_image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        status: 'approved'
      }
    ];

    console.log('Inserting sample trainer data...');

    for (const trainer of sampleTrainers) {
      const { error } = await supabase
        .from('trainer_profiles')
        .insert(trainer);
      
      if (error) {
        console.error('Error inserting trainer:', error);
      } else {
        console.log(`Successfully inserted trainer: ${trainer.name}`);
      }
    }

    return { success: true, message: 'Sample trainers inserted successfully' };
  } catch (error) {
    console.error('Error inserting sample trainer data:', error);
    return { success: false, message: 'Failed to insert sample trainer data' };
  }
};
