export default function ItemDetail({ name, value }) {
  return (
    <div className="w-full flex justify-between my-2">
      <span className="font-bold w-[80px] capitalize">{name}</span>
      <p>{value || value === 0 ? value : "null"}</p>
    </div>
  );
}
