import dateFormat from 'date-format'

export default function (value, format='yyyy-MM-dd') {
  if(isNaN(value)){
    return value;
  }
  return dateFormat.asString(format,new Date(parseInt(value)));
}
