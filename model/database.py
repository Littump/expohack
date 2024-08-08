from typing import Optional
from datetime import datetime
from sqlalchemy import TIMESTAMP
from sqlalchemy import Text, create_engine, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column

engine = create_engine('postgresql+psycopg2://django_user:mysecretpassword@localhost:5432/django')


def get_session():
    return Session(engine)


class Base(DeclarativeBase):
    pass


class Thing(Base):
    __tablename__ = "api_thing"

    id: Mapped[str] = mapped_column(Text, primary_key=True)
    name: Mapped[str] = mapped_column(Text)
    description: Mapped[Optional[str]] = mapped_column(Text)
    last_update: Mapped[Optional[datetime]] = mapped_column(TIMESTAMP(timezone=True), default=datetime.now)


class Recommendation(Base):
    __tablename__ = "api_recommendation"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    thing_id: Mapped[str] = mapped_column(Text)
    thing_recommendation_id: Mapped[str] = mapped_column(Text)


class HistoryBuy(Base):
    __tablename__ = "api_historybuy"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    thing_id: Mapped[str] = mapped_column(Text)
    client_id: Mapped[str] = mapped_column(Text)
    date: Mapped[Optional[datetime]] = mapped_column(TIMESTAMP(timezone=True), default=datetime.now)


class ClientRecommendation(Base):
    __tablename__ = "api_clientrecommendation"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    client_id: Mapped[str] = mapped_column(Text)
    thing_id: Mapped[str] = mapped_column(Text)


class Client(Base):
    __tablename__ = "api_client"

    id: Mapped[str] = mapped_column(Text, primary_key=True)
    last_update: Mapped[Optional[datetime]] = mapped_column(TIMESTAMP(timezone=True), default=datetime.now)
