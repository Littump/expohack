from typing import Optional

from sqlalchemy import Text
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column

engine = None


def get_session():
    return Session(engine)


class Base(DeclarativeBase):
    pass


class Thing(Base):
    __tablename__ = "api_thing"

    id: Mapped[int] = mapped_column(Text, primary_key=True)
    name: Mapped[str] = mapped_column(Text)
    description: Mapped[Optional[str]] = mapped_column(Text)
    recommendation: Mapped[Optional[str]] = mapped_column(Text) ## ???
