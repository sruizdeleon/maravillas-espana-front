

export default function Paragraph({className, text, maxLength}){
  return (<p className={className}>
    {text.length > maxLength ? `${text.substring(0,maxLength)}...`:text}
  </p>)
}