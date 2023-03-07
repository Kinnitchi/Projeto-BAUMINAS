// function intermediateconditional40() {

// 	/* var hoje = new Date();
// 	var data = hoje.setDate(hoje.getDate() + 1);

// 	log.info('KINNITCHI --> data :');
// 	log.dir(data);


// 	var obj = hAPI.calculateDeadLineTime(hoje, 0, 480, "Default")
// 	var dataPrazo = obj[0];


// 	log.info('KINNITCHI --> dataPrazo :' + dataPrazo);

// 	isData = (hoje >= dataPrazo);



// 	return isData; */

// 	var processID = getValue("WKNumProces");

// 	var dataset = DatasetFactory.getDataset(
// 		"processHistory",
// 		null,
// 		[
// 			DatasetFactory.createConstraint("processInstanceId", processID, processID, ConstraintType.MUST),
// 			DatasetFactory.createConstraint("stateSequence", "40", "40", ConstraintType.MUST)
// 		],
// 		null);



// 	var today = new Date();
// 	var endDate =
// 		log.info("KINNITCHI --> today : " + today);
// 	var obj = hAPI.calculateDeadLineTime(today, 0, 480, "Default");
// 	log.info("KINNITCHI --> OBJ : " + obj);
// 	log.dir(obj)
// 	var deadLineDate = obj[0];
// 	log.info("KINNITCHI --> deadLineDate : " + deadLineDate);



// 	// return today >= deadLineDate ? true : false;
// 	return false;

// }