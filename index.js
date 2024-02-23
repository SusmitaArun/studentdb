const mongoose = require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/prepinstaCollege')

	.then(() => console.log('database connected successfully'))

	.catch((e) => console.log('not connected', e))
    
    
    const dbase = mongoose.connection;

    const academicRecordsSchema = new mongoose.Schema({
      studentID: { type: Number, required: true },
      name: { type: String, required: true },
      grades: { type: Object, required: true },
      subjects: { type: Array, required: true },
    });
    
    const coCurricularActivitiesSchema = new mongoose.Schema({
      studentID: { type: Number, required: true },
      name: { type: String, required: true },
      activityType: { type: String, required: true },
      duration: { type: Number, required: true },
      achievements: { type: String },
    });
    
    const AcademicRecord = mongoose.model('AcademicRecord', academicRecordsSchema);
    const CoCurricularActivity = mongoose.model('CoCurricularActivity', coCurricularActivitiesSchema);
    
    const academicRecordData = {
      studentID: 1,
      name: "John Doe",
      grades: { math: 90, science: 85, history: 78 },
      subjects: ["math", "science", "history"],
    };
     
    const coCurricularActivityData = {
      studentID: 1,
      name: "John Doe",
      activityType: "Sports",
      duration: 3,
      achievements: "Won first place in basketball tournament.",
    };
    
    const saveDataToDatabase = async () => {
      try {
        // Create instances of models with data
        const academicRecord = new AcademicRecord(academicRecordData);
        const coCurricularActivity = new CoCurricularActivity(coCurricularActivityData);
    
        // Save instances to the database
        await academicRecord.save();
        await coCurricularActivity.save();
    
        console.log('Data saved successfully');
      } catch (error) {
        console.error('Error saving data:', error);
      } finally {
        // Disconnect from the database after saving
        mongoose.disconnect();
      }
    };
    
    // Call the function to save the data
    saveDataToDatabase();