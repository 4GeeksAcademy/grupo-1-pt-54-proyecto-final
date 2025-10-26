from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, DateTime, ForeignKey, Integer, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, UTC
import enum
db = SQLAlchemy()


class StatusEnum(enum.Enum):
    TO_READ = "to_read"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


class User(db.Model):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=False)
    is_verified: Mapped[bool] = mapped_column(
        Boolean(), nullable=False, default=False)
    first_name: Mapped[str] = mapped_column(String(50), nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime, default=datetime.now(UTC))
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime, onupdate=datetime.now(UTC), default=datetime.now(UTC))

    reading_lists: Mapped["ReadingList"] = relationship(
        back_populates="user", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_active": self.is_active
        }

    @classmethod
    def create_user(cls, data):
        try:
            new_user = cls(**data)
            db.session.add(new_user)
            db.session.commit()
            return new_user
        except Exception as e:
            print(f"Error creating user: {e}")
            db.session.rollback()
            return None


class ReadingList(db.Model):
    __tablename__ = "reading_list"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime, default=datetime.now(UTC))
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime, onupdate=datetime.now(UTC), default=datetime.now(UTC))

    books: Mapped[list["Book"]] = relationship(
        back_populates="reading_list", cascade="all, delete-orphan")
    user: Mapped["User"] = relationship(back_populates="reading_lists")

    def serialize(self):
        return {
            "id": self.id,
        }


class Book (db.Model):
    __tablename__ = "book"
    id: Mapped[int] = mapped_column(primary_key=True)
    reading_list_id: Mapped[int] = mapped_column(
        ForeignKey("reading_list.id"), nullable=False)
    author: Mapped[str] = mapped_column(String(70), nullable=False)
    progress: Mapped[int] = mapped_column(Integer, nullable=True, default=0)
    status: Mapped[StatusEnum] = mapped_column(
        Enum(StatusEnum), nullable=False)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    image_url: Mapped[str] = mapped_column(String(300), nullable=True)
    created_at: Mapped[DateTime] = mapped_column(
        DateTime, default=datetime.now(UTC))
    updated_at: Mapped[DateTime] = mapped_column(
        DateTime, onupdate=datetime.now(UTC), default=datetime.now(UTC))

    reading_list: Mapped["ReadingList"] = relationship(back_populates="books")

    def serialize(self):
        return {
            "id": self.id,
            "author": self.author,
            # do not serialize the password, its a security breach
            "progress": self.progress,
            "status": self.status,
            "title": self.title,
            "image_url": self.image_url
        }
    # []
