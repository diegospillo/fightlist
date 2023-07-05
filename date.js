function date(timestamp){
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    
    // Extracting components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so we add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    // Creating a formatted date string
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return formattedDate+" "+formattedTime;
    
}

module.exports = date;