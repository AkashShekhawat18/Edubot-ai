export default function TeacherCard({ name = 'Teacher' }) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg">{name}</div>
  );
}
