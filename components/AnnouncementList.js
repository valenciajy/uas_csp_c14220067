"use client";
import Link from "next/link";

export default function AnnouncementsList({announcements, onEdit, onDelete}) {
    return (
        <table className="product-table">
        <thead>
            <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {announcements.map((p) => (
            <tr key={p.id}>
                <td>
                <Link href={`/dashboard/announcements/${p.id}`}>
                    {p.title}
                </Link>
                </td>
                <td>{p.content}</td>
                <td>
                <button onClick={() => onDelete(p.id)} className="danger">
                    Delete
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    )
}