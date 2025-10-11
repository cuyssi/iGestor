from alembic import context
from sqlalchemy import create_engine, pool
from app.database import DATABASE_URL, Base
from app.models import User, Turn

target_metadata = Base.metadata

def run_migrations_online() -> None:
    connectable = create_engine(str(DATABASE_URL), poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

def run_migrations_offline() -> None:
    url = str(DATABASE_URL)
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
